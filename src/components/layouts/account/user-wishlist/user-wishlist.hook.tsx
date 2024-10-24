import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { post_mutate_wishlist } from "./user-wishlist.lib";
import { user } from "../../auth";
import { useAtom } from "jotai";
import { User } from "../user-profile";

export type UseMutateProps = {
  id: number;
  wish_list_state: "add" | "remove";
};
export type QueryKeyMutateType = {
  wish_list_state: "add" | "remove";
  id: number;
  user: User | null;
};

export const useMutate = ({ id, wish_list_state }: UseMutateProps) => {
  const [userData] = useAtom(user);
  const querykey: QueryKeyMutateType = {
    wish_list_state,
    user: userData,
    id,
  };

  const startMutation = useMutation({
    mutationKey: ["wishlist", querykey],
    mutationFn: () => post_mutate_wishlist(querykey),
    onSuccess: () => {
      toast.success(
        `Successfully ${wish_list_state === "remove" ? "removed" : "added"} the ad to wishlist`,
      );
    },
    onError: () => {
      toast.error(
        `Failed to ${wish_list_state === "remove" ? "remove" : "add"} athe ad to wishlist`,
      );
    },
  });

  return { startMutation };
};
