import AuthWrapper from "@/features/auth/components/auth-wrapper";
import SignInForm from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <AuthWrapper
      title="Sign In"
      description="Enter your credentials to sign in."
    >
      <SignInForm />
    </AuthWrapper>
  );
}
