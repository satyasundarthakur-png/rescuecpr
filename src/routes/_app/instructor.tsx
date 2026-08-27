import { createFileRoute } from "@tanstack/react-router";
import InstructorDashboard from "@/pages/instructor/InstructorDashboard";

export const Route = createFileRoute("/_app/instructor")({
  head: () => ({
    meta: [
      { title: "Instructor Dashboard — ResusPro Academy" },
      { name: "description", content: "Learner performance and content review status for instructors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InstructorDashboard,
});
