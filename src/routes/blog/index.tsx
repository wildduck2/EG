import { Footer, Header } from "@/components/layouts";
import { Blog } from "@/components/pages/blog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  component: () => {
    return (
      <>
        <Header />
        <Blog />
        <Footer />
      </>
    );
  },
});
