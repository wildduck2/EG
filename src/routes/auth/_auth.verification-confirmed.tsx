import { getUser } from "@/components/layouts/account/user-profile";
import { AuthVerificationConfirmedPage } from "@/components/pages";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/verification-confirmed")({
  beforeLoad: async () => {
    const _user = await getUser();
    if (_user) {
      return redirect({
        to: "/",
      });
    }
  },

  component: () => {
    return (
      <>
        <AuthVerificationConfirmedPage />
      </>
    );
  },
});
