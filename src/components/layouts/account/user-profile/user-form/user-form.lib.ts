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
        `/user/user-data?phone_number=${user.phone_number}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res_data.success) {
      localStorage.setItem("user-info", JSON.stringify(res_data.data.user));
      return res_data.data.user;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export const update_user_data = async ({
  data,
  attachments,
}: UpdateUserFormData) => {
  const user: User = JSON.parse(localStorage.getItem("user-info") as string);
  if (!user) {
    toast.error("فشل في تحديث بيانات المستخدم");
    return null;
  }

  const formData = new FormData();

  // Convert Base64 to Blob if attachments are provided
  if (attachments) {
    const contentType = "image/jpeg"; // Adjust the content type as needed
    const blob = base64ToBlob(attachments, contentType);
    formData.append("image", blob, "profile-picture.jpg"); // Adjust file name as needed
    // } else {
    //   toast.error("No attachment provided");
    //   return null;
  }

  // Add other fields to the FormData
  formData.append("name", data.username);
  formData.append("email", data.email);
  formData.append("phone_number", data.phone);
  if (user.is_trader === 1) {
    formData.append("name_company", data.companyname);
  }
  formData.append("user_type", user.is_trader === 1 ? "trader" : "client");

  try {
    const { data: res_data } = await axios.post(
      `${process.env.BACKEND__BASE_URL}/user/update-profile`,
      formData,
      {
        withCredentials: true,
        headers: {
          // 'Content-Type': 'multipart/form-data', // Axios will set this automatically
        },
      },
    );

    if (res_data.success) {
      toast.success("فشل في تحديث بيانات المستخدم");
      return res_data.data;
    }

    toast.error("فشل في تحديث بيانات المستخدم");
    return null;
  } catch (error) {
    console.error(error);
    toast.error("فشل في تحديث بيانات المستخدم");
    return null;
  }
};
// Function to convert Base64 string to Blob
function base64ToBlob(base64: string, contentType = "", sliceSize = 512): Blob {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}
