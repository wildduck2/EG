//@ts-nocheck
import { Footer, Header, user } from "@/components/layouts";
import { getUser } from "@/components/layouts/account/user-profile";
import { Home } from "@/components/pages";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: () => {
    const [_user] = useAtom(user);
    const route = useNavigate();

    if (!_user) {
      return route({
        to: "/auth/signin",
      });
    }
    useEffect(() => {
      (async () => {
        const res = await getUser(_user);
        if (!res) {
          throw redirect({
            to: "/auth/signin",
          });
        }
      })();
    });

    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    );
  },
});
