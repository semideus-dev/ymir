"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "@/features/workspaces/schemas";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Loader2 } from "lucide-react";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  onCancel?: () => void;
}

export default function CreateWorkspaceCard({ onCancel }: Props) {
  const { mutate, isPending } = useCreateWorkspace();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onSubmit(values: z.infer<typeof createWorkspaceSchema>) {
    const formData = {
      ...values,
      image: values.image instanceof File ? values.image : undefined,
    };
    mutate(
      { form: formData },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  }

  return (
    <Card className="w-[90%] md:w-[70%]">
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
        <CardDescription>
          A workspace is a place where you can collaborate with your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="my-2 h-[1px] w-full bg-gray-300" />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <div className="relative size-[72px] overflow-hidden rounded-md">
                        {" "}
                        <Image
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          alt="workspace image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Avatar className="size-[72px]">
                        <AvatarFallback>
                          <Icon
                            icon="f7:photo-fill"
                            width="36"
                            height="36"
                            className="text-muted-foreground"
                          />
                        </AvatarFallback>
                        <AvatarImage />
                      </Avatar>
                    )}
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">Workspace Logo</p>
                        <p className="text-sm text-muted-foreground">
                          Maximum file size of 5MB
                        </p>
                      </div>
                      <input
                        className="hidden"
                        type="file"
                        accept=".jpg,.jpeg,.png, .svg"
                        ref={inputRef}
                        onChange={handleImageChange}
                      />
                      <Button
                        type="button"
                        disabled={isPending}
                        variant="outline"
                        size="sm"
                        className="mt-2 w-fit"
                        onClick={() => inputRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            />
            <br />
            <Button
              type="submit"
              className="w-full"
              effect="expandIcon"
              icon={ArrowRight}
              disabled={isPending}
              iconPlacement="right"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
