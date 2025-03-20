"use server";

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
