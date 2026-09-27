import { useState } from "react";

type Operator = "+" | "-" | "*" | "/";

export default function CalculatorPage() {
  const [left, setLeft] = useState("0");
  const [right, setRight] = useState("0");
  const [operator, setOperator] = useState<Operator>("+");

  const first = Number(left);
  const second = Number(right);
  const valid =
    Number.isFinite(first) && Number.isFinite(second) && !(operator === "/" && second === 0);
  const result = valid
    ? operator === "+"
      ? first + second
      : operator === "-"
        ? first - second
        : operator === "*"
          ? first * second
          : first / second
    : null;

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground">Calculator</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Evaluate two values with exact decimal input.
        </p>
      </header>
      <section className="grid gap-4 rounded-lg border border-border bg-card p-5 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          First value
          <input
            className="min-w-0 rounded-md border border-input bg-background px-3 py-2"
            type="number"
            value={left}
            onChange={(event) => setLeft(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Operation
          <select
            className="rounded-md border border-input bg-background px-3 py-2"
            value={operator}
            onChange={(event) => setOperator(event.target.value as Operator)}
          >
            <option value="+">Add</option>
            <option value="-">Subtract</option>
            <option value="*">Multiply</option>
            <option value="/">Divide</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Second value
          <input
            className="min-w-0 rounded-md border border-input bg-background px-3 py-2"
            type="number"
            value={right}
            onChange={(event) => setRight(event.target.value)}
          />
        </label>
        <output
          className="sm:col-span-3 rounded-md bg-secondary p-4 text-right font-mono text-2xl text-foreground"
          aria-live="polite"
        >
          {result === null
            ? "Cannot divide by zero or use invalid values"
            : result.toLocaleString(undefined, { maximumFractionDigits: 10 })}
        </output>
      </section>
    </main>
  );
}
