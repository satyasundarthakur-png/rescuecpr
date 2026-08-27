import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/pages/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResusPro Academy — Resuscitation & Emergency-Care Training" },
      {
        name: "description",
        content:
          "Interactive simulation-based training for CPR, BLS, ACLS, PALS, NALS and ATLS. Practice clinical decisions and build confidence.",
      },
      { property: "og:title", content: "ResusPro Academy" },
      {
        property: "og:description",
        content: "Interactive resuscitation & emergency-care training platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});
