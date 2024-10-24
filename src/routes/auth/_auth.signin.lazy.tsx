import { user } from "@/components/layouts";
import { Signin } from "@/components/pages";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createLazyFileRoute("/auth/_auth/signin")({
  component: () => {
    const [_user] = useAtom(user);
    const route = useNavigate();

    if (_user) {
      return route({
        to: "/",
      });
    }

    return <Signin />;
  },
});
