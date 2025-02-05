"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrent } from "@/features/auth/api/use-current";
import { useSignOut } from "@/features/auth/api/use-sign-out";
import { Loader } from "lucide-react";
import { Icon } from "@iconify/react";

export function UserButton() {
  const { mutate: signOut } = useSignOut();
  const { data: user, isLoading } = useCurrent();

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const { name, email } = user;

  const fallback = name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? "U");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 border transition hover:opacity-75">
          <AvatarFallback className="flex items-center justify-center font-semibold">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border transition hover:opacity-75">
            <AvatarFallback className="flex items-center justify-center text-xl font-semibold">
              {fallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium"> {name || "User"}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="my-2 h-[1px] w-full bg-muted" />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex cursor-pointer items-center justify-center font-medium text-destructive"
        >
          <Icon icon="stash:signout" width="48" height="48" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
