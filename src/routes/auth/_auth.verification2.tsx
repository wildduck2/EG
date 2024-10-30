import { AuthVerificationPage } from "@/components/pages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/verification2")({
  component: () => (
    <>
      <AuthVerificationPage verify_register={true} />
    </>
  ),
});
