import { TraderProfilePage } from "@/components/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/account/_account/trader/$id")({
  component: () => {
    return (
      <>
        <TraderProfilePage />
      </>
    );
  },
});
