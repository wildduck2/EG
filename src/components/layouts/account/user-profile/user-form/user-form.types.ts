import { UserInfoFormSchemaType } from "./user-form.dto";

export type User = {
  id: number;
  name: string;
  phone_number: string;
  image: string | null;
  name_company: string | null;
  email: string | null;
};

export type UserInfoFormProps = { data: User };

export type UpdateUserFormData = {
  data: UserInfoFormSchemaType;
};
