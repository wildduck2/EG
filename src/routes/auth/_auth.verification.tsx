import { AuthVerificationPage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/verification")({
  component: () => (
    <>
      <AuthVerificationPage />
    </>
  ),
});
