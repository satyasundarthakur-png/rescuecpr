import { createFileRoute } from "@tanstack/react-router";
import Courses from "@/pages/Courses";

export const Route = createFileRoute("/_app/courses/")({
  head: () => ({
    meta: [
      { title: "Course Library — ResusPro Academy" },
      { name: "description", content: "Browse guideline-aligned CPR, BLS, ACLS, PALS, NALS and ATLS training courses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Courses,
});
