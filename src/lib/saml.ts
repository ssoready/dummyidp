export interface AssertionData {
  assertionId: string;
  idpEntityId: string;
  subjectId: string;
  firstName: string;
  lastName: string;
  sessionId: string;
  now: string;
  expire: string;
  spEntityId: string;
}

export async function encodeAssertion(
  key: CryptoKey,
  assertionData: AssertionData,
): Promise<string> {
  return btoa(await signAssertion(key, assertionData));
}

async function signAssertion(
  key: CryptoKey,
  assertionData: AssertionData,
): Promise<string> {
  const digest = await digestValue(assertionData);
  const signature = await signatureValue(key, assertionData);
  return signedAssertion(assertionData, digest, signature);
}

function signedAssertion(
  assertionData: AssertionData,
  digest: string,
  signature: string,
): string {
  return `<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol"><saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="${assertionData.assertionId}"><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>${digest}</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>${signature}</ds:SignatureValue><ds:KeyInfo><ds:X509Data><ds:X509Certificate>MIIDBzCCAe+gAwIBAgIUCLBK4f75EXEe4gyroYnVaqLoSp4wDQYJKoZIhvcNAQELBQAwEzERMA8GA1UEAwwIZHVtbXlpZHAwHhcNMjQwNTEzMjE1NDE2WhcNMzQwNTExMjE1NDE2WjATMREwDwYDVQQDDAhkdW1teWlkcDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKhmgQmWb8NvGhz952XY4SlJlpWIK72RilhOZS9frDYhqWVJHsGH9Z7sSzrM/0+YvCyEWuZV9gpMeIaHZxEPDqW3RJ7KG51fn/s/qFvwctf+CZDjyfGDzYs+XIgf7p56U48EmYeWpB/aUW64gSbnPqrtWmVFBisOfIx5aY3NubtTsn+g0XbdX0L57+NgSvPQHXh/GPXA7xCIWm54G5kqjozxbKEFA0DS3yb6oHRQWHqIAM/7mJMdUVZNIV1q7c2JIgAl23uDWq+2KTE2R5liP/KjvjwKonVKtTqGqX6ei25rsTHOaDpBH/LdQK2txgsm7R7+IThWNvUI0TttrmwBqyMCAwEAAaNTMFEwHQYDVR0OBBYEFD142gxIAJMhpgMkgpzmRNoW9XbEMB8GA1UdIwQYMBaAFD142gxIAJMhpgMkgpzmRNoW9XbEMA8GA1UdEwEB/wQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBADQd6k6zFIc20GfGHY5C2MFwyGOmP5/UG/JiTq7Zky28G6D0NA0je+GztzXx7VYDfCfHxLcm2k5t9nYhb9kVawiLUUDVF6s+yZUXA4gUA3KoTWh1/oRxR3ggW7dKYm9fsNOdQAbxUUkzp7HLZ45ZlpKUS0hO7es+fPyF5KVw0g0SrtQWwWucnQMAQE9m+B0aOf+92y7JQkdgdR8Gd/XZ4NZfoOnKV7A1utT4rWxYCgICeRTHx9tly5OhPW4hQr5qOpngcsJ9vhr86IjznQXhfj3hql5lA3VbHW04ro37ROIkh2bShDq5dwJJHpYCGrF3MQv8S3m+jzGhYL6m9gFTm/8=</ds:X509Certificate></ds:X509Data></ds:KeyInfo></ds:Signature><saml2:Issuer>${assertionData.idpEntityId}</saml2:Issuer><saml2:Subject><saml2:NameID>${assertionData.subjectId}</saml2:NameID><saml2:SubjectConfirmation><saml2:SubjectConfirmationData InResponseTo="${assertionData.sessionId}"></saml2:SubjectConfirmationData></saml2:SubjectConfirmation></saml2:Subject><saml2:Conditions NotBefore="${assertionData.now}" NotOnOrAfter="${assertionData.expire}"><saml2:AudienceRestriction><saml2:Audience>${assertionData.spEntityId}</saml2:Audience></saml2:AudienceRestriction></saml2:Conditions><saml2:AttributeStatement><saml2:Attribute Name="firstName"><saml2:AttributeValue>${assertionData.firstName}</saml2:AttributeValue></saml2:Attribute><saml2:Attribute Name="lastName"><saml2:AttributeValue>${assertionData.lastName}</saml2:AttributeValue></saml2:Attribute></saml2:AttributeStatement></saml2:Assertion></saml2p:Response>`;
}

async function signatureValue(
  key: CryptoKey,
  assertionData: AssertionData,
): Promise<string> {
  const digest = await digestValue(assertionData);
  const enc = new TextEncoder();
  const signatureData = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    enc.encode(signaturePart(digest)),
  );
  return arrayBufferToBase64(signatureData);
}

function signaturePart(digest: string): string {
  return `<ds:SignedInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></ds:CanonicalizationMethod><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"></ds:SignatureMethod><ds:Reference><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"></ds:Transform><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"></ds:Transform></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"></ds:DigestMethod><ds:DigestValue>${digest}</ds:DigestValue></ds:Reference></ds:SignedInfo>`;
}

async function digestValue(assertionData: AssertionData): Promise<string> {
  const enc = new TextEncoder();
  const digestData = await crypto.subtle.digest(
    "SHA-256",
    enc.encode(digestPart(assertionData)),
  );
  return arrayBufferToBase64(digestData);
}

function digestPart(assertionData: AssertionData): string {
  return `<saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion" ID="${assertionData.assertionId}"><saml2:Issuer>${assertionData.idpEntityId}</saml2:Issuer><saml2:Subject><saml2:NameID>${assertionData.subjectId}</saml2:NameID><saml2:SubjectConfirmation><saml2:SubjectConfirmationData InResponseTo="${assertionData.sessionId}"></saml2:SubjectConfirmationData></saml2:SubjectConfirmation></saml2:Subject><saml2:Conditions NotBefore="${assertionData.now}" NotOnOrAfter="${assertionData.expire}"><saml2:AudienceRestriction><saml2:Audience>${assertionData.spEntityId}</saml2:Audience></saml2:AudienceRestriction></saml2:Conditions><saml2:AttributeStatement><saml2:Attribute Name="firstName"><saml2:AttributeValue>${assertionData.firstName}</saml2:AttributeValue></saml2:Attribute><saml2:Attribute Name="lastName"><saml2:AttributeValue>${assertionData.lastName}</saml2:AttributeValue></saml2:Attribute></saml2:AttributeStatement></saml2:Assertion>`;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  let binary = "";
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
