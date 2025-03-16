"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PiSpinner } from "react-icons/pi";
import type { Session } from "@/lib/auth";
import { toast } from "sonner";
import { useSession } from "@/app/providers/session-provider";
import { createProject } from "@/features/dashboard/actions";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateProjectDialog() {
  const session = useSession();

  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  
  
  const onSubmit = async (data: FormValues) => {
    if (!session) {
      toast("You must be logged in to create a project");
      return;
    }
    
    const user = session.user;

    try {
      await createProject({
        name: data.name,
        userId: user.id,
      });
      toast("Project created successfully");
    } catch (error) {
      console.error(error);
      toast("Failed to create project");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Project
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          A new project will be created under your account.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <PiSpinner className="animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
