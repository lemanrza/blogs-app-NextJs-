import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <>
      <div className="flex justify-center items-center mt-16">
        <SignIn path="/auth/login" routing="path" signUpUrl="/auth/register" />
      </div>
    </>
  );
}