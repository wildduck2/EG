import { Separator } from "@/components/ui";
import { TraderProfileAds } from "../trader-profile-ads";

export const TraderProfile = ({ id }: { id: string }) => {
  return (
    <section className="flex gap-8 items-start my-8 min-h-[63vh]">
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-3xl font-semibold">{"duck-ui"}</h2>
        <Separator className="px-2" />
        <div>{id}</div>

        <TraderProfileAds id={id} />
      </div>
    </section>
  );
};
