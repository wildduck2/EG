import axios from "axios";
import { UpdateUserFormData } from "./user-form.types";
import { toast } from "sonner";
import { User } from "@/components/layouts/home/ad-item-card";

export const token = "17|sWdz2ihTHtn38P3cqQukik3Qr6fwg4gBkJ6Ipv4o9a76b011";

export async function getUser() {
  try {
    const user = JSON.parse(localStorage.getItem("user-info") as string);
    if (!user) return null;

    const { data: res_data } = await axios.get(
      process.env.BACKEND__BASE_URL +
        "/user/user-data" +
        "?phone_number=" +
        user.phone_number,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res_data.success) {
      return res_data.data.user;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const update_user_data = async ({ data }: UpdateUserFormData) => {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  if (!user) {
    toast.error("Your data has not been saved");
    return null;
  }

  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/update-profile",
      {
        name: data.username,
        email: data.email,
        phone_number: data.phone,
        name_company: data.companyname,
        user_type: user.is_trader === 1 ? "trader" : "client",
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res_data.success) {
      toast.success("Your data has been saved");
      return res_data.data;
    }

    toast.error("Your data has not been saved");
    return null;
  } catch (error) {
    console.log(error);
    toast.error("Your data has not been saved");
    return null;
  }
};
