import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth")({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
