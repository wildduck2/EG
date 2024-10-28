import { useQuery } from "@tanstack/react-query";
import { AccountFormSkeleton } from "./account-form.skeleton";
import { getUser, UserInfoForm } from "../user-form";
import { UpdatePasswordForm } from "../update-password-form";
import { useAtom } from "jotai";
import { user } from "@/components/layouts/auth";

export function AccountForm() {
  // Get User Query
  const { data, status } = useQuery({
    queryKey: ["account-info"],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return <AccountFormSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <div className="flex items-start 2xl:gap-24 gap-8 flex-col xl:flex-row">
        <UserInfoForm data={data} />
        <UpdatePasswordForm />
      </div>
    );
  }

  if (status === "error") {
    return <AccountFormSkeleton />;
  }
}
