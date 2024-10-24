import { NextRequest, NextResponse } from "next/server";
import {
  appIdpEntityId,
  appIdpRedirectUrl,
  appLoginUrl,
  getApp,
} from "@/app/app";
import { INSECURE_PUBLIC_CERTIFICATE } from "@/lib/insecure-cert";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const prefix = "-----BEGIN CERTIFICATE-----\n";
  const suffix = "-----END CERTIFICATE-----";
  const certNoPEMHeaders = INSECURE_PUBLIC_CERTIFICATE.substring(
    0,
    INSECURE_PUBLIC_CERTIFICATE.length - suffix.length,
  )
    .substring(prefix.length)
    .replaceAll("\n", "");

  const app = await getApp(params.id);
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?>
<md:EntityDescriptor entityID="${appIdpEntityId(app!)}" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata">
  <md:IDPSSODescriptor WantAuthnRequestsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
    <md:KeyDescriptor use="signing">
      <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
        <ds:X509Data>
          <ds:X509Certificate>${certNoPEMHeaders}</ds:X509Certificate>
        </ds:X509Data>
      </ds:KeyInfo>
    </md:KeyDescriptor>
    <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
    <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="${appIdpRedirectUrl(app!)}"/>
    <md:SingleSignOnService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" Location="${appLoginUrl(app!)}"/>
  </md:IDPSSODescriptor>
</md:EntityDescriptor>`,
    {
      headers: {
        "content-type": "application/xml;charset=ISO-8859-1",
        "x-content-type-options": "nosniff",
      },
    },
  );
}
