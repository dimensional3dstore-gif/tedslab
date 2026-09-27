import { createFileRoute } from "@tanstack/react-router";
import InformationUsePage from "@/policies/information-use";

export const Route = createFileRoute("/information-use")({ component: InformationUsePage });
