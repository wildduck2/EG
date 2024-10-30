import { AuthSide, AuthVerification } from "@/components/layouts";

export const AuthVerificationPage = ({
  verify_register,
}: {
  verify_register?: boolean;
}) => {
  // <AuthSide />
  return (
    <main className="flex w-full min-h-screen">
      <AuthVerification verify_register={verify_register} />
    </main>
  );
};
