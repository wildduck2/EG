import { Header, user } from "@/components/layouts";
import SettingsLayout from "@/components/layouts/account/layots";
import { getUser } from "@/components/layouts/account/user-profile";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React from "react";

export const Route = createFileRoute("/account/_account/")({
  component: () => {
    // const [_user] = useAtom(user);
    // const route = useNavigate();
    //
    // if (!_user) {
    //   return route({
    //     to: "/auth/signin",
    //   });
    // }
    //
    // React.useEffect(() => {
    //   (async () => {
    //     const res = await getUser(_user);
    //     if (!res) {
    //       throw redirect({
    //         to: "/auth/signin",
    //       });
    //     }
    //   })();
    // });

    return (
      <div>
        <Header />
        <SettingsLayout></SettingsLayout>
      </div>
    );
  },
});
