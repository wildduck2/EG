import { Footer, Header } from "@/components/layouts";
import { Home } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    );
  },
});
