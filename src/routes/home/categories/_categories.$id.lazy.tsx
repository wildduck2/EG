import { ProductPage } from "@/components/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/home/categories/_categories/$id")({
  component: () => <ProductPage />,
});
