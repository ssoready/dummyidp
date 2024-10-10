# DummyIDP

[DummyIDP](https://ssoready.com/docs/dummyidp) is a website you can use to test
your application's SAML and SCIM support end-to-end. From your application's
perspective, it's exactly like the identity provider ("IDP") your customers use,
but unlike commercial IDPs there's no "input your email" or "talk to sales" step
to use DummyIDP.

DummyIDP implements the "Identity Provider" side of the SAML and SCIM protocols.
It is meant for use as a way to test your application's support for the "Service
Provider" side of the SAML and SCIM protocols. See ["DummyIDP Security
Posture"](https://ssoready.com/docs/dummyidp#dummyidp-security-posture) for
details.

## Local development / self-hosting

DummyIDP is available for free online at https://dummyidp.com. You can also
self-host it or hack on it locally.

DummyIDP is a Next.js application. It is deployed in production on Vercel. You
can hack on it yourself by running:

```bash
npm run dev
```
