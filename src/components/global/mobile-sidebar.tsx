"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import Sidebar from "@/components/global/sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <Icon
          icon="mynaui:sidebar"
          width="32"
          height="32"
          className="text-muted-foreground"
        />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
