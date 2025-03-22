import { FaUsers } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MembersCardProps {
  members: {
    id: string;
    name: string;
  }[];
  ownerId: string;
}

export function MembersCard({ members, ownerId }: MembersCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between text-lg">
        <CardTitle className="font-medium">Members</CardTitle>
        <FaUsers />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{members.length}</div>
        <div className="mt-2 flex -space-x-2">
          {members.map((member) => (
            <Avatar
              key={member.id}
              className="bg-primary border border-background text-background h-8 w-8"
            >
              <AvatarFallback>
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
