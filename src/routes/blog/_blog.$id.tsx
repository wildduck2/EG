import { BlogItem } from "@/components/pages/blog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/_blog/$id")({
  component: () => (
    <>
      <BlogItem />
    </>
  ),
});
