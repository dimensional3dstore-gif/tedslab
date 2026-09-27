import { PolicyPage, PolicySection } from "./policy";

export default function InformationUsePage() {
  return (
    <PolicyPage title="Information use">
      <PolicySection title="Learning features">
        <p>
          Information entered into study tools is used to provide the requested feature. Notes in
          the Noter extension remain in the browser until exported; account-backed features may use
          the connected database.
        </p>
      </PolicySection>
      <PolicySection title="Model-generated output">
        <p>
          AI-generated explanations can be incomplete or wrong. Check important claims against
          reliable sources, and do not use educational tools as a substitute for professional
          medical, legal, or safety advice.
        </p>
      </PolicySection>
      <PolicySection title="Service configuration">
        <p>
          Before relying on this statement, verify deployed provider settings, server logs, database
          policies, and retention behavior. Feature code alone does not establish production data
          practices.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
