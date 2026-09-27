import { createFileRoute } from "@tanstack/react-router";
import HelpCenterPage from "@/help-center/page";

export const Route = createFileRoute("/help-center")({
  head: () => ({ meta: [{ title: "Help Centre — Ted's Lab" }] }),
  component: HelpCenterPage,
});
