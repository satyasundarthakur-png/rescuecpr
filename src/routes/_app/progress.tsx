import { createFileRoute } from "@tanstack/react-router";
import Progress from "@/pages/Progress";

export const Route = createFileRoute("/_app/progress")({
  head: () => ({
    meta: [
      { title: "Your Progress — ResusPro Academy" },
      { name: "description", content: "Mastery by learning objective across your resuscitation training." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Progress,
});
