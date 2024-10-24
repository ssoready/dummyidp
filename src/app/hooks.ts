import { App } from "@/app/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApp(id: string): App | undefined {
  const { data } = useQuery({
    queryKey: ["apps", id],
    queryFn: async () => {
      const res = await fetch(`/api/apps/${id}`, {
        cache: "no-cache",
      });
      return await res.json();
    },
  });

  return data;
}

export function useUpsertApp() {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["apps"],
    mutationFn: async (app: App) => {
      await fetch(`/api/apps`, {
        method: "POST",
        body: JSON.stringify(app),
      });

      await client.invalidateQueries({
        queryKey: ["apps", app.id],
      });
    },
  });
}
