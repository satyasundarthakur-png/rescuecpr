import { createFileRoute } from "@tanstack/react-router";
import QuizPage from "@/pages/QuizPage";

export const Route = createFileRoute("/_app/quiz/$quizId")({
  head: () => ({
    meta: [
      { title: "Quiz — ResusPro Academy" },
      { name: "description", content: "Knowledge check quiz with instant feedback and explanations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: QuizPage,
});
