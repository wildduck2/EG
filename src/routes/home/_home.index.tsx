import { Home } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/_home/")({
  component: () => (
    <>
      <Home />
    </>
  ),
});
