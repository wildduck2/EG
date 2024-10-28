import { user } from "@/components/layouts";
import { getUser } from "@/components/layouts/account/user-profile";
import { Signin } from "@/components/pages";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";

export const Route = createFileRoute("/auth/_auth/signin")({
  beforeLoad: async () => {
    const _user = await getUser();
    if (_user) {
      return redirect({
        to: "/",
      });
    }
  },
  component: () => {
    return <Signin />;
  },
});
