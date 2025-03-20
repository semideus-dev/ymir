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
    });
    return project;
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

  await db.invite.create({
    data: {
      email,
      projectId,
      userId: user.id,
    },
  });

  await sendEmail({
    to: email,
    subject: "You have been invited to a project",
    text: `You have been invited to the project ${project.name}. Click here to accept the invite: ${process.env.BETTER_AUTH_URL}/api/auth/accept-invite?projectId=${projectId}`,
  });

  return { success: true };
}
