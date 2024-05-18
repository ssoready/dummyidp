import React from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

export function HomePage() {
  const [storeData, setStoreData] = useStore();
  const navigate = useNavigate();
  const handleCreateApp = () => {
    const id = uuidv4();
    setStoreData({
      ...storeData,
      apps: {
        ...storeData.apps,
        [id]: {
          id,
          spAcsUrl: "",
          spEntityId: "",
          requiredDomain: "",
        },
      },
    });

    navigate(`/apps/${id}`);
  };

  return <Button onClick={handleCreateApp}>Create new app</Button>;
}
