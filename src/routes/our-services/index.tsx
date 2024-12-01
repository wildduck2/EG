import { Footer, Header } from "@/components/layouts";
import { OurServices } from "@/components/pages/our-services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/our-services/")({
  component: () => {
    return (
      <>
        <Header />
        <OurServices />
        <Footer />
      </>
    );
  },
});
