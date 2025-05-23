"use server";

import { sendEmail } from "@/features/auth/actions";
import { db } from "@/lib/db";

interface CreateProjectProps {
  name: string;
  ownerId: string;
}

export async function createProject({ name, ownerId }: CreateProjectProps) {
  try {
    await db.project.create({
      data: {
        name,
        ownerId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function getProjectsByUserId(ownerId: string) {
  try {
    const projects = await db.project.findMany({
      where: {
        ownerId,
      },
    });
    return { projects };
  } catch (error) {
    console.error(error);
    return { projects: [] };
  }
}

export async function getProjectById(projectId: string) {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        members: true,
        owner: true,
      },
    });

    if (!project) {
      return null;
    }

    const membersWithOwner = [project.owner, ...project.members];

    return { ...project, members: membersWithOwner };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendInvite(email: string, projectId: string) {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    return { error: "User not found" };
  }

  const project = await db.project.findUnique({ where: { id: projectId } });

  if (!project) {
    return { error: "Project not found" };
  }

  const invite = await db.invite.create({
    data: {
      email,
      projectId,
      userId: user.id,
    },
  });

  await sendEmail({
    to: email,
    subject: "You have been invited to a project",
    text: `ou've been invited to join the project "${project.name}". Click the link to accept: ${process.env.BETTER_AUTH_URL}/dashboard/projects/invites?inviteId=${invite.id}`,
  });

  return { success: true };
}

export async function acceptInvite(inviteId: string, userId: string) {
  // Find the invite
  const invite = await db.invite.findUnique({
    where: { id: inviteId },
    include: { project: true },
  });

  if (!invite) {
    throw new Error("Invite not found");
  }

  // Add the user to the project members
  await db.project.update({
    where: { id: invite.projectId },
    data: {
      members: {
        connect: { id: userId },
      },
    },
  });

  // Delete the invite
  await db.invite.delete({
    where: { id: inviteId },
  });

  return { success: true, projectId: invite.projectId };
}
