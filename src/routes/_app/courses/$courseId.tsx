import { createFileRoute } from "@tanstack/react-router";
import CourseDetail from "@/pages/CourseDetail";

export const Route = createFileRoute("/_app/courses/$courseId")({
  head: () => ({
    meta: [
      { title: "Course — ResusPro Academy" },
      { name: "description", content: "Course modules, objectives and training content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CourseDetail,
});
