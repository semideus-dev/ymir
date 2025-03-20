"use client";

import React, { useEffect, useState } from "react";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CreateProjectDialog from "@/features/dashboard/components/create-project-dialog";
import { useSession } from "@/app/providers/session-provider";
import { getProjectsByUserId } from "../actions/project";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function Projects() {
  const session = useSession();
  const router = useRouter();

  if (!session) {
    return null;
  }

  const user = session.user;

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!user) return;

    async function fetchProjects() {
      const { projects } = await getProjectsByUserId(user.id);
      setProjects(projects);
    }

    fetchProjects();

    const interval = setInterval(fetchProjects, 5000);

    return () => clearInterval(interval);
  }, [user]);

  function handleProjectClick(projectId: string) {
    router.push(`/dashboard/projects/${projectId}`);
  }

  return (
    <section className="py-8 px-16 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Projects</h1>
        <CreateProjectDialog />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card
            className="h-[200px] justify-between hover:scale-105 duration-200 transition-all hover:cursor-pointer"
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
            </CardHeader>
            <CardFooter className="text-muted-foreground">
              Created on {new Date(project.createdAt).toLocaleDateString()}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
