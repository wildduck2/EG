import { Footer, Header } from "@/components/layouts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/_blog")({
  component: () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  },
});
