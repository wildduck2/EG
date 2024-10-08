import { Header } from "@/components/layouts";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/home/_home")({
  component: () => (
    <div>
      <Header />
      <Outlet />
    </div>
  ),
});
