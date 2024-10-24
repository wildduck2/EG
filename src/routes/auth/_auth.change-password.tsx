import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { user } from "@/components/layouts";
import { AuthChangePasswordPage } from "@/components/pages";

export const Route = createFileRoute("/auth/_auth/change-password")({
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
        <AuthChangePasswordPage />
      </>
    );
  },
});
