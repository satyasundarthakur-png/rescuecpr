import { createFileRoute } from "@tanstack/react-router";
import Certificates from "@/pages/Certificates";

export const Route = createFileRoute("/_app/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates — ResusPro Academy" },
      { name: "description", content: "Training completion records from ResusPro Academy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Certificates,
});
