import { UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export const signoutAsync = async ({
  route,
}: {
  route: UseNavigateResult<string>;
}) => {
  try {
    const user = JSON.parse(localStorage.getItem("user-info") || "{}");
    console.log(user);
    const { data } = await axios.post(
      `${process.env.BACKEND__BASE_URL}/user/logout`,
      {
        phone_number: user.phone_number,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    console.log(data.success);
    if (!data.success) {
      toast.error("فشل التسجيل الخروج");
      return;
    }

    localStorage.setItem("user-info", JSON.stringify(null));
    route({ to: "/auth/signin" });
    toast.success("تم تسجيل الخروج بنجاح");
    return true;
  } catch (error) {
    toast.error("فشل التسجيل الخروج");
    return false;
  }
};
