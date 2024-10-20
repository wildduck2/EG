import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  //     <ScrollRestoration />
  // <TanStackRouterDevtools />
  component: () => (
    <React.Fragment>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </React.Fragment>
  ),
});
