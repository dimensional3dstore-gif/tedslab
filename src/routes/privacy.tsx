import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyPage from "@/policies/privacy";

export const Route = createFileRoute("/privacy")({ component: PrivacyPolicyPage });
