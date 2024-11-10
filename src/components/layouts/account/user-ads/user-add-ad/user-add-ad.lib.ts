import { toast } from "sonner";
import { User } from "../../user-profile";
import axios from "axios";
import { AddAdFormType } from "./user-add-ad";

export async function user_add_ad({ ad_data }: { ad_data: AddAdFormType }) {
  const user: User = JSON.parse(localStorage.getItem("user-info") || "{}");
  try {
    const formData = new FormData();

    // Append files
    ad_data.attachment.forEach((file: File, index: number) => {
      formData.append(`images[${index}]`, file); // server expects 'images' as the field name
    });

    // Append other form data with appropriate types
    formData.append("name", ad_data.name);
    formData.append("description", ad_data.description);
    formData.append("price", String(ad_data.price));
    formData.append("category_id", String(ad_data.category));
    formData.append("subcategory_id", String(ad_data.subcategory));
    formData.append("brand_country_id", String(ad_data.brand_country));
    formData.append("third_branch_id", String(ad_data.third_branch));
    formData.append("gov_id", String(ad_data.governorate));
    formData.append("region_id", String(ad_data.region));
    formData.append("negotiable", ad_data.negotiate === "yes" ? "1" : "0");
    formData.append("longitude", String(ad_data.location.lng));
    formData.append("latitude", String(ad_data.location.lat));
    formData.append("address", ad_data.address);
    formData.append("notes", ad_data.note);
    formData.append("phone_number", user.phone_number);

    const { data } = await axios.post(
      `${process.env.BACKEND__BASE_URL}/client/ads`,
      formData,
      {
        withCredentials: true,
        headers: {
          // Let axios set the Content-Type to multipart/form-data
        },
      },
    );
    toast.success("الاعلان تم انشاء بنجاح");

    return data;
  } catch (error) {
    toast.error("فشل انشاء الاعلان");
    return null;
  }
}

export async function delete_ad(id: string) {
  const user: User = JSON.parse(localStorage.getItem("user-info") || "{}");
  try {
    const { data } = await axios.delete(
      `${process.env.BACKEND__BASE_URL}/client/ads/${id}?phone_number=${user.phone_number}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!data.success) {
      toast.error("فشل حذف الاعلان");
    }

    toast.success("تم حذف الاعلان بنجاح");
    return data;
  } catch (error) {
    toast.error("فشل حذف الاعلان");
    return null;
  }
}

export async function user_edit_ad({
  ad_data,
  id,
}: {
  ad_data: AddAdFormType;
  id: string;
}) {
  const user: User = JSON.parse(localStorage.getItem("user-info") || "{}");
  console.log(ad_data, "ad_data");

  try {
    const formData = new FormData();

    // Handle each attachment (URL or File)
    await Promise.all(
      ad_data.attachment.map(async (attachment: any, index: number) => {
        // If `attachment` is a URL string
        if (typeof attachment === "string") {
          try {
            const response = await fetch(
              `https://development.goods.eg/uploads${attachment}`,
            );
            if (!response.ok) {
              console.error(
                `Failed to fetch image at ${attachment}: ${response.statusText}`,
              );
              throw new Error(`Failed to fetch image at ${attachment}`);
            }
            const blob = await response.blob();
            const file = new File([blob], `image${index}.jpg`, {
              type: blob.type,
            });
            formData.append(`images[${index}]`, file);
          } catch (error) {
            console.error(
              `Error fetching image ${index} at ${attachment}`,
              error,
            );
            throw error;
          }
        }
        // If `attachment` is already a File object
        else if (attachment instanceof File) {
          formData.append(`images[${index}]`, attachment);
        } else {
          console.error(
            `Unsupported attachment type at index ${index}`,
            attachment,
          );
          return null;
        }
      }),
    );

    // Append other form data
    formData.append("name", ad_data.name);
    formData.append("description", ad_data.description);
    formData.append("price", String(ad_data.price));
    formData.append("category_id", String(ad_data.category));
    formData.append("subcategory_id", String(ad_data.subcategory));
    formData.append("brand_country_id", String(ad_data.brand_country));
    formData.append("third_branch_id", String(ad_data.third_branch));
    formData.append("gov_id", String(ad_data.governorate));
    formData.append("region_id", String(ad_data.region));
    formData.append("negotiable", ad_data.negotiate === "yes" ? "1" : "0");
    formData.append("longitude", String(ad_data.location.lng));
    formData.append("latitude", String(ad_data.location.lat));
    formData.append("address", ad_data.address);
    formData.append("notes", ad_data.note);
    formData.append("phone_number", user.phone_number);

    // Send the data using axios
    const { data } = await axios.post(
      `${process.env.BACKEND__BASE_URL}/client/ads/${id}`,
      formData,
      {
        withCredentials: true,
      },
    );

    if (data.success) {
      toast.success("تم تعديل الاعلان بنجاح");
      return data;
    }

    return null;
  } catch (error) {
    console.error("Failed to create ad", error);
    toast.error("فشل تعديل الاعلان");
    return null;
  }
}
