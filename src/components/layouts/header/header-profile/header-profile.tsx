import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useTranslation } from "react-i18next";
import { signoutAsync } from "../../auth";
import { useNavigate } from "@tanstack/react-router";
import { HeaderProfileProps } from "./header-profile.types";
import { cn } from "@/lib/utils";

export const HeaderProfile = ({ className, userData }: HeaderProfileProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button
      className={cn(
        "size-[47px] w-[57px] p-0 rounded-full overflow-hidden hidden lg:flex",
        className,
      )}
      variant={"outline"}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            className="object-cover w-12 h-12 rounded-full"
            src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + userData?.image}
            alt={userData?.name}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              localStorage.setItem("tab", "account");
              navigate({ to: "/account" });
            }}
          >
            {t("my_account")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:bg-destructive hover:text-accent"
            onClick={async () => {
              signoutAsync({ route: navigate });
            }}
          >
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  );
};
