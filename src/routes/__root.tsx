import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScrollArea } from "@/components/ui";
import { useTranslation } from "react-i18next";

export const Route = createRootRoute({
  // <TanStackRouterDevtools />
  component: () => {
    const { i18n } = useTranslation();

    return (
      <React.Fragment>
        <ScrollRestoration />
        <Outlet />
        <ScrollArea className="h-screen">
          <div className="h-full" dir={i18n.dir()}></div>
          <ScrollToTop />
        </ScrollArea>
        <ReactQueryDevtools initialIsOpen={false} />
      </React.Fragment>
    );
  },
});

export default function ScrollToTop() {
  const current = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [current]);

  return null;
}
