import { TraderProfilePage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

type TraderRouteState = {
  isVIP: boolean;
};

export const Route = createFileRoute("/account/_account/trader/$id")({
  component: () => {
    return (
      <>
        <TraderProfilePage />
      </>
    );
  },
});
