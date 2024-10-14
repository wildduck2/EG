import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
  //     <ScrollRestoration />
  // <TanStackRouterDevtools />
  component: () => (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  ),
});
