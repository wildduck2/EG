import { ProductPage } from "@/components/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
  "/home/categories/product/_product/$id",
)({
  component: () => <ProductPage />,
});
