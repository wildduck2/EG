import { Header } from "@/components/layouts";
import SettingsLayout from "@/components/layouts/account/layots";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/account/_account/")({
  component: () => {
    return (
      <div>
        <SettingsLayout></SettingsLayout>
      </div>
    );
  },
});
