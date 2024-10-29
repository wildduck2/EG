import { Footer, get_filter_data, Header } from "@/components/layouts";
import { getUser } from "@/components/layouts/account/user-profile";
import { filterData } from "@/context";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React from "react";

export const Route = createFileRoute("/account/_account")({
  beforeLoad: async () => {
    const _user = await getUser();
    if (!_user) {
      return redirect({
        to: "/auth/signin",
      });
    }
  },
  component: () => {
    const [filter_data, setFilterData] = useAtom(filterData);
    React.useEffect(() => {
      (async () => {
        const res = await get_filter_data();

        if (!res) return;
        setFilterData((old) => res);
      })();
    }, []);

    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  },
});
