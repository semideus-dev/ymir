import { cn } from "@/lib/utils";
import Link from "next/link";

import { Icon } from "@iconify/react";

const SIZE = 20;

export const routes = [
  {
    label: "Dashboard",
    href: "/",
    icon: <Icon icon="tabler:dashboard" width={SIZE} height={SIZE} />,
    activeIcon: (
      <Icon
        icon="tabler:dashboard"
        width={SIZE}
        height={SIZE}
        className="text-primary"
      />
    ),
  },
  {
    label: "Tasks",
    href: "/tasks",
    icon: <Icon icon="hugeicons:task-02" width={SIZE} height={SIZE} />,
    activeIcon: (
      <Icon
        icon="hugeicons:task-02"
        width={SIZE}
        height={SIZE}
        className="text-primary"
      />
    ),
  },
  {
    label: "Members",
    href: "/members",
    icon: <Icon icon="lucide:users-round" width={SIZE} height={SIZE} />,
    activeIcon: (
      <Icon
        icon="lucide:users-round"
        width={SIZE}
        height={SIZE}
        className="text-primary"
      />
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Icon icon="ion:cog-outline" width={SIZE} height={SIZE} />,
    activeIcon: (
      <Icon
        icon="ion:cog-outline"
        width="24"
        height="24"
        className="text-primary"
      />
    ),
  },
];

export default function Navigation() {
  return (
    <ul className="flex flex-col">
      {routes.map((route) => {
        const isActive = false;
        return (
          <Link key={route.href} href={route.href}>
            <div
              className={cn(
                "flex items-center gap-2 rounded-md p-2 font-medium text-zinc-400 transition-all hover:text-primary",
                isActive &&
                  "bg-background text-primary shadow-md hover:opacity-100",
              )}
            >
              {isActive ? route.activeIcon : route.icon}
              <span>{route.label}</span>
            </div>
          </Link>
        );
      })}
    </ul>
  );
}
