import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ResusPro Academy" },
      { name: "description", content: "Sign in to ResusPro Academy to continue your resuscitation training." },
      { property: "og:title", content: "Sign in — ResusPro Academy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});
