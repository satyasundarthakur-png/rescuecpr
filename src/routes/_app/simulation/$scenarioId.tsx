import { createFileRoute } from "@tanstack/react-router";
import SimulationPage from "@/pages/SimulationPage";

export const Route = createFileRoute("/_app/simulation/$scenarioId")({
  head: () => ({
    meta: [
      { title: "Scenario Simulation — ResusPro Academy" },
      { name: "description", content: "Interactive resuscitation scenario with guided debrief." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SimulationPage,
});
