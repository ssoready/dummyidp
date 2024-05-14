export interface AssertionData {
  idpEntityId: string;
  subjectId: string;
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
  return `<saml2p:Response xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol"><saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"><ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#"><ds:SignedInfo><ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/><ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/><ds:Reference><ds:Transforms><ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/><ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/></ds:Transforms><ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/><ds:DigestValue>${digest}</ds:DigestValue></ds:Reference></ds:SignedInfo><ds:SignatureValue>${signature}</ds:SignatureValue></ds:Signature><saml2:Issuer>${assertionData.idpEntityId}</saml2:Issuer><saml2:Subject><saml2:NameID>${assertionData.subjectId}</saml2:NameID><saml2:SubjectConfirmation><saml2:SubjectConfirmationData InResponseTo="${assertionData.sessionId}"></saml2:SubjectConfirmationData></saml2:SubjectConfirmation></saml2:Subject><saml2:Conditions NotBefore="${assertionData.now}" NotOnOrAfter="${assertionData.expire}"><saml2:AudienceRestriction><saml2:Audience>${assertionData.spEntityId}</saml2:Audience></saml2:AudienceRestriction></saml2:Conditions></saml2:Assertion></saml2p:Response>`;
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
  return `<saml2:Assertion xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion"><saml2:Issuer>${assertionData.idpEntityId}</saml2:Issuer><saml2:Subject><saml2:NameID>${assertionData.subjectId}</saml2:NameID><saml2:SubjectConfirmation><saml2:SubjectConfirmationData InResponseTo="${assertionData.sessionId}"></saml2:SubjectConfirmationData></saml2:SubjectConfirmation></saml2:Subject><saml2:Conditions NotBefore="${assertionData.now}" NotOnOrAfter="${assertionData.expire}"><saml2:AudienceRestriction><saml2:Audience>${assertionData.spEntityId}</saml2:Audience></saml2:AudienceRestriction></saml2:Conditions></saml2:Assertion>`;
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
