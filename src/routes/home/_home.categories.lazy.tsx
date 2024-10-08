import { Categories, Home } from "@/components/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/home/_home/categories")({
  component: () => (
    <>
      <Categories />
    </>
  ),
});
