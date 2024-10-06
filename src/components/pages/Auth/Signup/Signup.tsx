import { AuthSide, AuthSignup } from "@/components/layouts";

export const Signup = () => {
  return (
    <main className="flex w-full min-h-screen">
      <AuthSide />
      <AuthSignup />
    </main>
  );
};
