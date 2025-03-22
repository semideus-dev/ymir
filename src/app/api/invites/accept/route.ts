import { NextResponse } from "next/server";
import { acceptInvite } from "@/features/dashboard/actions/project";

export async function POST(request: Request) {
  const { inviteId, userId } = await request.json();

  try {
    const { projectId } = await acceptInvite(inviteId, userId);
    return NextResponse.json({ success: true, projectId });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
