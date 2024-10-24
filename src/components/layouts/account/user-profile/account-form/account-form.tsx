import { useQuery } from "@tanstack/react-query";
import { AccountFormSkeleton } from "./account-form.skeleton";
import { getUser, UserInfoForm } from "../user-form";
import { UpdatePasswordForm } from "../update-password-form";
import { useAtom } from "jotai";
import { user } from "@/components/layouts/auth";

export function AccountForm() {
  const [userData, setUserData] = useAtom(user);
  console.log(userData, "user-data");
  // Get User Query
  const { data, status } = useQuery({
    queryKey: ["account-info"],
    queryFn: async () => await getUser(userData),
    refetchOnWindowFocus: false,
  });

  if (status === "pending") {
    return "asdfa";
    return <AccountFormSkeleton />;
  }

  return "asdfa";
  if (status === "success" && data) {
    return (
      <div className="flex items-start 2xl:gap-24 gap-8 flex-col xl:flex-row">
        <UserInfoForm data={data} />
        <UpdatePasswordForm />
      </div>
    );
  }

  if (status === "error") {
    return "asdfa";
    return <AccountFormSkeleton />;
  }
}
