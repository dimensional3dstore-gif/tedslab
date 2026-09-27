import { PolicyPage, PolicySection } from "./policy";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy notice">
      <PolicySection title="Information handled">
        <p>
          When account services are configured, sign-in and profile information is processed through
          the connected Supabase project. The deployed project configuration determines exact fields
          and retention.
        </p>
      </PolicySection>
      <PolicySection title="AI requests">
        <p>
          Study questions may be sent to a configured hosted AI provider by the tutor. Confirm the
          active provider, its data controls, and request logging before describing this service as
          private or local-only.
        </p>
      </PolicySection>
      <PolicySection title="Before publication">
        <p>
          Document the production database, analytics, cookies, retention periods, contact method,
          and applicable user rights here. This draft intentionally avoids making claims that have
          not been verified.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
