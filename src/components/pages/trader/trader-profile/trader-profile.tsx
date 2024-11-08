//@ts-nocheck
import { TraderProfile } from "@/components/layouts";
import { useParams } from "@tanstack/react-router";

export const TraderProfilePage = () => {
  const { id } = useParams({ strict: false });
  return (
    <main className="container flex flex-col pm-4 lg:pt-[17rem] min-h-[94vh]">
      <TraderProfile id={id} />
    </main>
  );
};
