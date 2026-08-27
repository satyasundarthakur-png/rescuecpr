import { createFileRoute } from "@tanstack/react-router";
import ModulePage from "@/pages/ModulePage";

export const Route = createFileRoute("/_app/module/$moduleId")({
  head: () => ({
    meta: [
      { title: "Module — ResusPro Academy" },
      { name: "description", content: "Training module with video, interactive algorithm, simulation and quiz." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ModulePage,
});
