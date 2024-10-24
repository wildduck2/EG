import { user } from "@/components/layouts";
import { AuthVerificationConfirmedPage } from "@/components/pages";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createLazyFileRoute("/auth/_auth/verification-confirmed")({
  component: () => {
    const [_user] = useAtom(user);
    const route = useNavigate();

    if (_user) {
      return route({
        to: "/",
      });
    }

    return (
      <>
        <AuthVerificationConfirmedPage />
      </>
    );
  },
});
