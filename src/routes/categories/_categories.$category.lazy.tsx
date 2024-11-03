import { Categories, CategoryPageB1 } from "@/components/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/categories/_categories/$category")({
  component: () => <CategoryPageB1 />,
});
