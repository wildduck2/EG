import { AuthForgetPassword, AuthSide } from "@/components/layouts";

export const ForgetPassword = () => {
  return (
    <>
      <main className="flex w-full min-h-screen">
        <AuthSide />
        <AuthForgetPassword />
      </main>
    </>
  );
};
