import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function SocialAuthCard() {
  return (
    <div className="flex flex-col space-y-2">
      <Button variant="secondary">
        <Icon icon="flat-color-icons:google" />
        Continue with Google
      </Button>
      <Button variant="secondary">
        <Icon icon="logos:github-icon" />
        Continue with Github
      </Button>
    </div>
  );
}
