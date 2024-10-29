import { CategoriesPage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/categories/_categories/")({
  component: () => (
    <>
      <CategoriesPage />
    </>
  ),
});
