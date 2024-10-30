import { Footer, get_filter_data, Header } from "@/components/layouts";
import { filterData } from "@/context";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React from "react";

export const Route = createFileRoute("/categories/_categories")({
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
