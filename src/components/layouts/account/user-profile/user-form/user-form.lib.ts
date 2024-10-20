import axios from "axios";
import { UpdateUserFormData } from "./user-form.types";
import { toast } from "sonner";

export const token = "17|sWdz2ihTHtn38P3cqQukik3Qr6fwg4gBkJ6Ipv4o9a76b011";

export async function getUser() {
  // Simulate API call
  try {
    const { data: res_data } = await axios.get(
      process.env.BACKEND__BASE_URL + "/user/user-data",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  try {
    const { data: res_data } = await axios.post(
      process.env.BACKEND__BASE_URL + "/user/update-profile",
      {
        name: data.username,
        email: data.email,
        phone_number: data.phone,
        name_company: data.companyname,
      },
      {
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
