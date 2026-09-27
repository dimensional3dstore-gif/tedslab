import { useState } from "react";

export default function TemperatureConverterPage() {
  const [celsius, setCelsius] = useState("20");
  const value = Number(celsius);
  const valid = celsius.trim() !== "" && Number.isFinite(value);

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Temperature converter</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Convert Celsius to Fahrenheit and Kelvin.
        </p>
      </header>
      <section className="grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium text-foreground sm:col-span-3">
          Temperature in Celsius
          <input
            className="rounded-md border border-input bg-background px-3 py-2"
            type="number"
            step="any"
            value={celsius}
            onChange={(event) => setCelsius(event.target.value)}
          />
        </label>
        <TemperatureResult
          label="Fahrenheit"
          value={valid ? (value * 9) / 5 + 32 : null}
          unit="°F"
        />
        <TemperatureResult label="Kelvin" value={valid ? value + 273.15 : null} unit="K" />
        <TemperatureResult
          label="Rankine"
          value={valid ? ((value + 273.15) * 9) / 5 : null}
          unit="°R"
        />
      </section>
    </main>
  );
}

function TemperatureResult({
  label,
  value,
  unit,
}: {
  label: string;
  value: number | null;
  unit: string;
}) {
  return (
    <div className="rounded-md bg-secondary p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <output className="mt-2 block font-mono text-xl text-foreground" aria-live="polite">
        {value === null ? "Enter a temperature" : `${value.toFixed(2)} ${unit}`}
      </output>
    </div>
  );
}
