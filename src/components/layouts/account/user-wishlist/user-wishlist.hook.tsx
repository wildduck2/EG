import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { post_mutate_wishlist } from "./user-wishlist.lib";
import { user } from "../../auth";
import { useAtom } from "jotai";
import { User } from "../user-profile";
import { ProductType } from "../../home";

export type UseMutateProps = {
  id: number;
  wish_list_state: "add" | "remove";
};

export type QueryKeyMutateType = {
  wish_list_state: "add" | "remove";
  id: number;
};

export const useMutate = ({ id, wish_list_state }: UseMutateProps) => {
  const mutationFn = () => post_mutate_wishlist({ id, wish_list_state });

  const startMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      return queryClient.setQueryData<ProductType[]>(
        ["user_wishlist"],
        (old) => {
          if (!old) return [];

          // Filter out the item with the specified id
          return old.filter((item) => item.id !== id);
        },
      );
    },
  });

  return { startMutation };
};
