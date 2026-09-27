import { Pate } from "@/ai/page";
import { LlmLayout } from "./layout";

export default function LlmPage() {
  return (
    <LlmLayout>
      <main className="mx-auto w-full max-w-5xl p-5">
        <Pate />
      </main>
    </LlmLayout>
  );
}
