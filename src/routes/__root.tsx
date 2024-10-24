import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Footer, Header } from "@/components/layouts";
import { ScrollArea } from "@/components/ui";
import { useTranslation } from "react-i18next";

export const Route = createRootRoute({
  // <TanStackRouterDevtools />
  component: () => {
    const { i18n } = useTranslation();
    return (
      <React.Fragment>
        <ScrollArea className="h-screen">
          <div className="h-full" dir={i18n.dir()}>
            <Outlet />
          </div>
          <ScrollToTop />
        </ScrollArea>
        <ScrollRestoration getKey={(location) => location.pathname} />
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
