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
    const newState = {
      ...storeData,
      apps: {
        ...storeData.apps,
        [id]: {
          id,
          spAcsUrl: "",
        },
      },
    };
    console.log("want new state", newState);
    setStoreData(newState);

    navigate(`/apps/${id}`);
  };

  return <Button onClick={handleCreateApp}>Create new app</Button>;
}
