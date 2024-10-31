import { Separator } from "@/components/ui";
import { TraderProfileAds } from "../trader-profile-ads";
import { useLocation } from "@tanstack/react-router";
import { User } from "../../home/ad-item-card";

export const TraderProfile = ({ id }: { id: string }) => {
  const { state } = useLocation();
  const user = (state as any).user as User;

  return (
    user?.name && (
      <section className="flex gap-8 items-start my-8 min-h-[63vh]">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl font-semibold">{user?.name}</h2>
          <Separator className="px-2" />
          <div>{user?.name}'s ads</div>

          <TraderProfileAds id={id} />
        </div>
      </section>
    )
  );
};
