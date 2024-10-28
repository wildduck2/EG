import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthChangePasswordPage } from "@/components/pages";
import { getUser } from "@/components/layouts/account/user-profile";

export const Route = createFileRoute("/auth/_auth/change-password")({
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
        <AuthChangePasswordPage />
      </>
    );
  },
});
