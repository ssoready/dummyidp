import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface StoreData {
  apps: Record<string, App>;
}

export interface App {
  id: string;
  spAcsUrl: string;
  spEntityId: string;
  requiredDomain: string;
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

export function useUpdateApp() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (app: App) => {
      await axios.post(`${process.env.DUMMYIDP_API_URL}/api/set-app-config`, {
        appId: app.id,
        spAcsUrl: app.spAcsUrl,
        spEntityId: app.spEntityId,
        requiredDomain: app.requiredDomain,
      });

      await client.invalidateQueries({
        queryKey: ["apps", app.id],
      });
    },
  });
}

export function useGetApp(appId: string) {
  return useQuery({
    queryKey: ["apps", appId],
    queryFn: async (): Promise<App> => {
      const { data } = await axios.post<{
        appId: string;
        config: {
          spEntityId: string;
          spAcsUrl: string;
          requiredDomain: string;
        };
      }>(`${process.env.DUMMYIDP_API_URL}/api/get-app-config`, {
        appId,
      });

      return {
        id: data.appId,
        spEntityId: data.config.spEntityId,
        spAcsUrl: data.config.spAcsUrl,
        requiredDomain: data.config.requiredDomain,
      };
    },
  });
}
