import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ForgetPassword } from "@/components/pages";
import { useAtom } from "jotai";
import { user } from "@/components/layouts";
import { getUser } from "@/components/layouts/account/user-profile";

export const Route = createFileRoute("/auth/_auth/forget-password")({
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
        <ForgetPassword />
      </>
    );
  },
});
