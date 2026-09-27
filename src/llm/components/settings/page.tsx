import { useState } from "react";
import { LlmSettingsLayout } from "./layout";

const STORAGE_KEY = "tedslab.llm.preferences";

export default function LlmSettingsPage() {
  const [provider, setProvider] = useState("local");
  const [saved, setSaved] = useState(false);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ provider }));
    setSaved(true);
  };

  return (
    <LlmSettingsLayout>
      <header>
        <h1 className="font-display text-3xl font-bold text-foreground">AI preferences</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a preferred provider for this browser. Credentials are never stored here.
        </p>
      </header>
      <label className="grid max-w-sm gap-2 text-sm font-medium text-foreground">
        Preferred provider
        <select
          value={provider}
          onChange={(event) => {
            setProvider(event.target.value);
            setSaved(false);
          }}
          className="rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="local">Local tutor</option>
          <option value="hosted">Configured hosted service</option>
        </select>
      </label>
      <button
        type="button"
        onClick={save}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        Save preference
      </button>
      {saved && (
        <p role="status" className="text-sm text-primary">
          Preference saved in this browser.
        </p>
      )}
    </LlmSettingsLayout>
  );
}
