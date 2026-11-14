import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Person = { id: string; display_name: string | null; email: string | null; created_at: string };

export function usePeople() {
  return useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id,display_name,email,created_at").order("display_name");
      if (error) throw error;
      return (data ?? []) as Person[];
    },
  });
}