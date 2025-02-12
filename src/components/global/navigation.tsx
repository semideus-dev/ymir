import { routes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
