import { Button } from "@/components/ui/button";
import {
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="hidden w-14 flex-col border-r md:flex">
      <div className="flex flex-col items-center gap-4 p-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <FileText className="h-5 w-5" />
          <span className="sr-only">Projects</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Calendar className="h-5 w-5" />
          <span className="sr-only">Calendar</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Users className="h-5 w-5" />
          <span className="sr-only">Team</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </aside>
  );
}
