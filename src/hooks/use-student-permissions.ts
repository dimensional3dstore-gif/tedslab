import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getSupabaseAuthClient } from "@/integrations/supabase/auth";

type StudentPermissions = {
  loading: boolean;
  isStudent: boolean;
  onboardingComplete: boolean;
  aiAssistanceAllowed: boolean;
  browserLockEnabled: boolean;
};

export function useStudentPermissions(): StudentPermissions {
  const { user, loading: authLoading } = useAuth();
  const [permissions, setPermissions] = useState<StudentPermissions>({
    loading: true,
    isStudent: false,
    onboardingComplete: false,
    aiAssistanceAllowed: false,
    browserLockEnabled: false,
  });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setPermissions({ loading: false, isStudent: false, onboardingComplete: false, aiAssistanceAllowed: false, browserLockEnabled: false });
      return;
    }
    let active = true;
    const load = async () => {
      try {
        const client = getSupabaseAuthClient();
        const { data: profile, error: profileError } = await client.from("student_profiles").select("student_id,onboarding_complete").eq("student_id", user.id).maybeSingle();
        if (profileError) throw profileError;
        if (!profile) {
          if (active) setPermissions({ loading: false, isStudent: false, onboardingComplete: true, aiAssistanceAllowed: true, browserLockEnabled: false });
          return;
        }
        const { data: guardian, error: guardianError } = await client.from("student_guardians").select("ai_assistance_allowed,browser_lock_enabled").eq("student_id", user.id).eq("status", "approved").maybeSingle();
        if (guardianError) throw guardianError;
        if (active) setPermissions({
          loading: false,
          isStudent: true,
          onboardingComplete: profile.onboarding_complete,
          aiAssistanceAllowed: profile.onboarding_complete && guardian?.ai_assistance_allowed === true,
          browserLockEnabled: profile.onboarding_complete && guardian?.browser_lock_enabled === true,
        });
      } catch {
        if (active) setPermissions({ loading: false, isStudent: true, onboardingComplete: false, aiAssistanceAllowed: false, browserLockEnabled: false });
      }
    };
    void load();
    return () => { active = false; };
  }, [user, authLoading]);

  return permissions;
}
