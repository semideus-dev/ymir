import { getCurrent } from "@/features/auth/actions";
import CreateWorkspaceCard from "@/features/workspaces/components/create-workspace-card";
import { redirect } from "next/navigation";

export default async function IndexPage() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  return (
    <div>
      <CreateWorkspaceCard />
    </div>
  );
}
