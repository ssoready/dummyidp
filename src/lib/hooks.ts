import { App } from "@/lib/app";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApp(id: string | undefined): App | undefined {
  const { data } = useQuery({
    enabled: !!id,
    queryKey: ["apps", id],
    queryFn: async () => {
      const response = await fetch(`/api/apps?id=${id}`);
      if (!response.ok) {
        return;
      }
      return response.json();
    },
  });
  return data;
}

export function useUpsertApp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (app: App) => {
      await fetch(`/api/apps?id=${app.id}`, {
        method: "POST",
        body: JSON.stringify(app),
      });

      await queryClient.invalidateQueries({
        queryKey: ["apps", app.id],
      });
    },
  });
}
