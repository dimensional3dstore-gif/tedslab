import { createFileRoute } from "@tanstack/react-router";
import LostAtlasPage from "@/lost-atlas/page";

export const Route = createFileRoute("/lost-atlas")({ component: LostAtlasPage });
