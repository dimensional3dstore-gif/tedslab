import { createFileRoute } from "@tanstack/react-router";
import { NoterPage } from "@/extensions/page";

export const Route = createFileRoute("/extensions/noter")({ component: NoterPage });
