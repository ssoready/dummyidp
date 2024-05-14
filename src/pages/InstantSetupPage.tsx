import React, { useEffect } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useStore } from "@/lib/store";

export function InstantSetupPage() {
  const [storeData, setStoreData] = useStore();
  const [searchParams] = useSearchParams();

  const appId = searchParams.get("appId")!;
  const spAcsUrl = searchParams.get("spAcsUrl")!;
  const spEntityId = searchParams.get("spEntityId")!;
  const email = searchParams.get("email")!;
  const firstName = searchParams.get("firstName")!;
  const lastName = searchParams.get("lastName")!;

  const navigate = useNavigate();
  useEffect(() => {
    setStoreData({
      ...storeData,
      apps: {
        ...storeData.apps,
        [appId]: {
          id: appId,
          spAcsUrl,
          spEntityId,
        },
      },
    });

    navigate({
      pathname: `/apps/${appId}/sso`,
      search: createSearchParams({ email, firstName, lastName }).toString(),
    });
  }, [appId, spAcsUrl, spEntityId]);

  return <></>;
}
