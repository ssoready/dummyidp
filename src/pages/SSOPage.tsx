import React, { useEffect, useRef, useState } from "react";
import { encodeAssertion } from "@/lib/saml";
import { useNavigate } from "react-router";

export function SSOPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const jwk = {
        kty: "RSA",
        kid: "hSDIRRN-JumgcJ6YrpvCHpc0X46FLAzWXNFxPdmfmz0",
        n: "qGaBCZZvw28aHP3nZdjhKUmWlYgrvZGKWE5lL1-sNiGpZUkewYf1nuxLOsz_T5i8LIRa5lX2Ckx4hodnEQ8OpbdEnsobnV-f-z-oW_By1_4JkOPJ8YPNiz5ciB_unnpTjwSZh5akH9pRbriBJuc-qu1aZUUGKw58jHlpjc25u1Oyf6DRdt1fQvnv42BK89AdeH8Y9cDvEIhabngbmSqOjPFsoQUDQNLfJvqgdFBYeogAz_uYkx1RVk0hXWrtzYkiACXbe4Nar7YpMTZHmWI_8qO-PAqidUq1Ooapfp6LbmuxMc5oOkEf8t1Ara3GCybtHv4hOFY29QjRO22ubAGrIw",
        e: "AQAB",
        d: "Eggj0gx_PCyF3cvcPr4Z4gtkqe9SS7KtXyZJ1GhIruUs19EcD3oI9XL03T99KR9AKv4jI53ZwiGNGE6gXSXBGkKFAQHAMjo-ja8zzmBxU6p6iL6zbX6BAGN1kgflS6fqkZpa_DdHrLd6V8I-5hUF01SmBMj-z5Z2BK6tfEcml6XCVFBzd0QqZuACrdO9ScZvL1cd4DCHJJNBarCVgC9akxOi9THtgD72EYJQyVcsLbzKqoxnT9JW6onCBBKtUaP8fEzp9WMK6APJCkYK5I-1lX8tSf48-lzgBrn3cb9Zo5DYcGo0bJgVwzI4w-HS_etiOOrURmbbX1x9W_rGBhS8tQ",
        p: "7HH9QMjZmaD0UvDtdrX1aBgo8ZCWYShMfxzt1gIy6jaSgmcyGmMJeB9s-nCGopy8Iyd4jlggmgnWP4CqYbl6fmvZ-4ULHuc0DGaR1P6zhsF4fI6zCxWm6ijyIXM75Q67ccokLQeRzINKoOmkEQ2hgFKhiaKN4TVfanufECfvqzU",
        q: "tlPfEoqbGqYJtxKlND0ihXMTjSVGTbwUBUXUdzYUx7nKOGQSeCLYXbpm4KIBEYa4GNpuub8vnZD8c-FuzIb-yKH66nCa_Q2q8zhfM764pAao9P1OSjbXkA7mL6nO6LwAk7OFNa22z0H5GTRkzX8DJiAG90z_67qrQPmfmFfZ7_c",
        dp: "uBegSNqYoYax9AnluXG-mseEyV_71bWcqbOKcf_QSI8ozyMt3WGSs9Yz8WG_UciaqvxGXv26lHRoPZUeE2xoNRof5DcYC32UBrute5q7iIYGG2S3fj_jb5llvCmOTq-DvfrW48BrAkKOzm5a8XQddF3hq9nGgbweiDesBtYxQqk",
        dq: "OD9joBq2guAaOyo7YQRDNBwuOer3519QZdgHFcfPXVZJtl_Y-sr1KOUqe74-yiNfg_tPEWqTy-5Ak5dGUT6MN2URPWYDynF-_Y20gQgjeia71OiYUHjew4h1JtsiA9aL7wUA4XB35zSZHld1iZfXZtmWjJBqm1R5JJBd1ee0Sj0",
        qi: "ypr_PYU5UrV_Lw22vpa8wJ-C_Ux9nhiz4WtU4jgEX_RofgMra4iDXIVUL6BajWYZ7vj7_AFN2tELTMQ3Xhfc4FQ-CBQkvsLoXO6fzttdxBd_yO01YtijiT_ZwozO3wwzVuN65EGNCQ9haF3vEWEfTEN_-x7RG6xZnFtel6X8rqI",
      };

      const key = await window.crypto.subtle.importKey(
        "jwk",
        jwk,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        true,
        ["sign"],
      );

      const assertion = await encodeAssertion(key, {
        idpEntityId: "IDP_ENTITY_ID",
        subjectId: "ulysse@dummyidp.com",
        spEntityId:
          "http://localhost:8080/saml/saml_conn_e4wryo0hq30mcrzc32b67otha",
        sessionId: "",
        expire: "2025-01-01T00:00:00Z",
        now: "2022-01-01T00:00:00Z",
      });

      inputRef.current!.value = assertion;
      inputRef.current!.form!.submit();
    })();
  });

  // const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form
        method="post"
        action="http://localhost:8080/saml/saml_conn_e4wryo0hq30mcrzc32b67otha/acs"
        // ref={formRef}
      >
        <input type="hidden" name="SAMLResponse" ref={inputRef} />
      </form>
    </div>
  );
}
