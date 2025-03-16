import AuthWrapper from "@/features/auth/components/auth-wrapper";
import SignUpForm from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthWrapper
      title="Sign Up"
      description="Create an account to get started."
    >
      <SignUpForm />
    </AuthWrapper>
  );
}
