import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
import { getUser } from "@/components/layouts/account/user-profile";

export const Route = createRootRoute({
  beforeLoad: async () => {
    await getUser();
  },
  component: () => {
    const { i18n } = useTranslation();

    return (
      <React.Fragment>
        <ScrollRestoration />
        <Outlet />

        <ReactQueryDevtools initialIsOpen={false} position="left" />
      </React.Fragment>
    );
  },
});
// <ScrollArea className="h-screen">
//         <div className="h-full" dir={i18n.dir()}></div>
//         <ScrollToTop />
//       </ScrollArea>
