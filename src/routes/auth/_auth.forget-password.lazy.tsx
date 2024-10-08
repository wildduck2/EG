import { createLazyFileRoute } from "@tanstack/react-router";
import { ForgetPassword } from "@/components/pages";

export const Route = createLazyFileRoute("/auth/_auth/forget-password")({
  component: () => (
    <>
      <ForgetPassword />
    </>
  ),
});
