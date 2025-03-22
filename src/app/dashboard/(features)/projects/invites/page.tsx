"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "@/app/providers/session-provider";
import { acceptInvite } from "@/features/dashboard/actions/project";

export default function AcceptInvitePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();
  const inviteId = searchParams.get("inviteId");

  useEffect(() => {
    if (inviteId && session?.user?.id) {
      const handleAcceptInvite = async () => {
        try {
          const { projectId } = await acceptInvite(inviteId, session.user.id);
          router.push(`/dashboard/projects/${projectId}`);
        } catch (error) {
          alert((error as Error).message || "Failed to accept invite");
        }
      };

      handleAcceptInvite();
    }
  }, [inviteId, session, router]);

  return <div>Accepting invite...</div>;
}
