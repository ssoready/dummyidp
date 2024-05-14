import { useEffect, useState } from "react";

interface StoreData {
  apps: Record<string, App>;
}

interface App {
  id: string;
  spAcsUrl: string;
  spEntityId: string;
}

export function useStore(): [StoreData, (_: StoreData) => void] {
  const [state, setState] = useState<StoreData>(() => {
    const item = localStorage.getItem("store-data");
    return item === null ? { apps: {} } : JSON.parse(item);
  });

  return [
    state,
    (state) => {
      localStorage.setItem("store-data", JSON.stringify(state));
      setState(state);
    },
  ];
}
