import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { ForgetPassword } from "@/components/pages";
import { useAtom } from "jotai";
import { user } from "@/components/layouts";

export const Route = createLazyFileRoute("/auth/_auth/forget-password")({
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
        <ForgetPassword />
      </>
    );
  },
});
