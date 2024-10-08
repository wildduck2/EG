import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
  //     <ScrollRestoration />
  component: () => (
    <React.Fragment>
      <TanStackRouterDevtools />
      <Outlet />
    </React.Fragment>
  ),
});
