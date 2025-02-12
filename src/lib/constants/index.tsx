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
