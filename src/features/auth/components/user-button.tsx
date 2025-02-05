"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrent } from "@/features/auth/api/use-current";
import { useSignOut } from "@/features/auth/api/use-sign-out";
import { Loader } from "lucide-react";

export function UserButton() {
  const { data: user, isLoading } = useCurrent();

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="size-10 rounded-full bg-muted flex items-center justify-center">
        <Loader className="size-4 text-muted-foreground animate-spin" />
      </div>
    );
  }

  const { name, email } = user;

  const fallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  return (
    <Avatar className="size-10 hover:opacity-75 transition border">
      <AvatarFallback className="font-semibold flex items-center justify-center">
        {fallback}
      </AvatarFallback>
    </Avatar>
  );
}
