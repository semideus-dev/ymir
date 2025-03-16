import React from "react";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CreateProjectDialog from "@/features/dashboard/components/create-project-dialog";

export default function Projects() {
  
  return (
    <section className="py-8 px-16 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Projects</h1>
        <CreateProjectDialog />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Card className="h-[200px] justify-between">
          <CardHeader>
            <CardTitle className="text-2xl">mimir</CardTitle>
          </CardHeader>
          <CardFooter className="text-muted-foreground">
            cmk23rnkjc9nj3fmk
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
