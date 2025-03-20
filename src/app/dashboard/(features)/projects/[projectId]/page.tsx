import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { FaUsers, FaUserPlus, FaBell } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOutlineTaskAlt } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getProjectById } from "@/features/dashboard/actions/project";
import InviteDialog from "@/features/dashboard/components/invite-dialog";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const project = await getProjectById(projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="px-10 py-5 border-b flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight uppercase">
            {project.name}
          </h1>
          <span className="text-muted-foreground">
            Created on {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <FaBell />
            <span>Notifications</span>
          </Button>
          <InviteDialog projectId={project.id} />
          <Button size="icon">
            <Settings />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mx-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-lg">
            <CardTitle className="font-medium">Tasks</CardTitle>
            <MdOutlineTaskAlt />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              8 completed, 16 pending
            </p>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-lg">
            <CardTitle className="font-medium">Members</CardTitle>
            <FaUsers />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="mt-2 flex -space-x-2">
              <Avatar className="bg-primary border border-background text-background h-8 w-8">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="bg-primary border border-background text-background h-8 w-8">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="bg-primary border border-background text-background h-8 w-8">
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <Avatar className="bg-primary border border-background text-background h-8 w-8">
                <AvatarFallback>+5</AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-lg">
            <CardTitle className="font-medium">Invoice</CardTitle>
            <IoStatsChart />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2400</div>
            <p className="text-xs text-muted-foreground">
              Remaining budget of $4000
            </p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
