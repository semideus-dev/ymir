"use server";

import { db } from "@/lib/db";

interface CreateProjectProps {
  name: string;
  userId: string;
}

export async function createProject({ name, userId }: CreateProjectProps) {
  try {
    await db.project.create({
      data: {
        name,
        userId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
