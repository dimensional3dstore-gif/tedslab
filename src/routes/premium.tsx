import { createFileRoute } from "@tanstack/react-router";
import { PremiumGate } from "@/components/premium/PremiumGate";
import { PremiumWorkspace } from "@/components/premium/PremiumWorkspace";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Ted's Lab Pro — Premium Learning Engine" },
      { name: "description", content: "Ted's Lab Pro personal learning engine." },
    ],
  }),
  component: () => <PremiumGate><PremiumWorkspace /></PremiumGate>,
});
