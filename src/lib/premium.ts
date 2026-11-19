import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export type PremiumPlan = "free" | "pro" | "research";

export const PREMIUM_FEATURES = [
  "AI Study Coach",
  "Adaptive Learning",
  "Personal Knowledge Atlas",
  "Deep Research",
  "AI Course Builder",
  "Document-to-Course",
  "Video-to-Lesson",
  "Interactive Simulations",
  "Change Encyclopaedia What-If",
  "AI Exams",
  "Smart Notebook",
  "Universal Save",
  "Offline Study Packs",
  "Knowledge XP",
] as const;

export function usePremiumAccess() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const query = useQuery({
    queryKey: ["premium-entitlement", user?.id ?? null],
    enabled: Boolean(user) && !isAdmin,
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("premium_entitlements")
        .select("plan,active,active_until,features")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const row = query.data;
  const timeValid = !row?.active_until || new Date(row.active_until).getTime() > Date.now();
  const active = Boolean(user && (isAdmin || (row?.active && timeValid && row.plan !== "free")));

  return {
    user,
    isAdmin,
    isLoading: authLoading || query.isLoading,
    active,
    plan: isAdmin ? "research" as PremiumPlan : ((row?.plan ?? "free") as PremiumPlan),
    features: (row?.features ?? {}) as Record<string, unknown>,
    error: query.error,
  };
}
