import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Footer, Header } from "@/components/layouts";
import { ScrollArea } from "@/components/ui";

export const Route = createRootRoute({
  //     <ScrollRestoration />
  // <TanStackRouterDevtools />
  component: () => (
    <React.Fragment>
      <ScrollArea className="h-screen">
        <div className="h-full">
          <Outlet />
        </div>
      </ScrollArea>
      <ReactQueryDevtools initialIsOpen={false} />
    </React.Fragment>
  ),
});
