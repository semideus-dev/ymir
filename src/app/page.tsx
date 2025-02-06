import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div className="mt-24 flex items-center justify-center space-x-4">
      <UserButton />
    </div>
  );
}
