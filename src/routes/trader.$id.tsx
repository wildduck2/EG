import { Footer, Header } from "@/components/layouts";
import { TraderProfilePage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/trader/$id")({
  component: () => {
    return (
      <>
        <Header />
        <TraderProfilePage />
        <Footer />
      </>
    );
  },
});
