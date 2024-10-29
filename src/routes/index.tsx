//@ts-nocheck
import { Footer, Header, user } from "@/components/layouts";
import { getUser } from "@/components/layouts/account/user-profile";
import { Home } from "@/components/pages";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    );
  },
});
