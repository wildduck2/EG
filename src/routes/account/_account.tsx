import { Footer, Header } from "@/components/layouts";
import { getUser } from "@/components/layouts/account/user-profile";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/account/_account")({
  beforeLoad: async () => {
    const _user = await getUser();
    if (!_user) {
      return redirect({
        to: "/auth/signin",
      });
    }
  },
  component: () => {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  },
});
