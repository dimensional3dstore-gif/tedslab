import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export function useUserCollection<T>(
  collection: string,
  recordKey: string,
  initialValue: T,
) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const queryKey = [
    "user-data",
    user?.id ?? null,
    collection,
    recordKey,
  ] as const;

  const query = useQuery({
    queryKey,
    enabled: Boolean(user),
    queryFn: async () => {
      if (!user) return initialValue;
      const { data, error } = await supabase
        .from("user_data")
        .select("payload")
        .eq("user_id", user.id)
        .eq("collection", collection)
        .eq("record_key", recordKey)
        .maybeSingle();
      if (error) throw error;
      return (data?.payload as T | undefined) ?? initialValue;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: T) => {
      if (!user) throw new Error("Sign in to save your data.");
      const { error } = await supabase
        .from("user_data")
        .upsert(
          { user_id: user.id, collection, record_key: recordKey, payload },
          { onConflict: "user_id,collection,record_key" },
        );
      if (error) throw error;
      return payload;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<T>(queryKey);
      queryClient.setQueryData(queryKey, payload);
      return { previous };
    },
    onError: (_error, _payload, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  });

  return {
    value: query.data ?? initialValue,
    save: saveMutation.mutate,
    saveAsync: saveMutation.mutateAsync,
    isLoading: Boolean(user) && query.isLoading,
    error: query.error ?? saveMutation.error,
    user,
  };
}
