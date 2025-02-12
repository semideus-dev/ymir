import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "@/components/global/mobile-sidebar";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 pt-4">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of all your projects.
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}
