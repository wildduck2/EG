import { AuthSide, AuthSignin } from "@/components/layouts";

export const Signin = () => {
  return (
    <main className="flex w-full min-h-screen">
      <AuthSide />
      <AuthSignin />
    </main>
  );
};
