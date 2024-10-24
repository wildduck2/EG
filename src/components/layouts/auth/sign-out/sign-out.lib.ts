import { UseNavigateResult } from "@tanstack/react-router";
import axios from "axios";
import { toast } from "sonner";

export const signoutAsync = async ({
  route,
}: {
  route: UseNavigateResult<string>;
}) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND__BASE_URL}/user/logout`,
      {
        phone_number: "+201285971377",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.success) {
      toast.error("The User is not Signed out");
      return;
    }
    route({ to: "/" });

    localStorage.setItem("user-info", JSON.stringify(null));
    toast.success("The User is Signed out successfully");
    return true;
  } catch (error) {
    toast.error("Sign out failed. Please try again.");
    return false;
  }
};
