import { createFileRoute } from "@tanstack/react-router";
import AlgorithmPage from "@/pages/AlgorithmPage";

export const Route = createFileRoute("/_app/algorithm/$algorithmId")({
  head: () => ({
    meta: [
      { title: "Interactive Algorithm — ResusPro Academy" },
      { name: "description", content: "Practice clinical algorithms in learn, practice and test modes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AlgorithmPage,
});
