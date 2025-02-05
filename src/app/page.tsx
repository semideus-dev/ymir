"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useSignOut } from "@/features/auth/api/use-sign-out";
import { UserButton } from "@/features/auth/components/user-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IndexPage() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const { mutate } = useSignOut();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push("/sign-in");
    }
  }, [data]);

  return (
    <div className="flex items-center space-x-4 justify-center mt-24" >
      <span>Home page</span> <UserButton /> <Button onClick={() => mutate()}>Logout</Button>
    </div>
  );
}
