import { createFileRoute } from "@tanstack/react-router";
import TranslatePage from "@/translate/page";

export const Route = createFileRoute("/translate")({ component: TranslatePage });
