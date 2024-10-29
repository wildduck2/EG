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
    toast.success("Ad created successfully");

    return data;
  } catch (error) {
    toast.error("Failed to create ad");
    return null;
  }
}
