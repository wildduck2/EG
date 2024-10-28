import { get_filter_data } from "@/components/layouts";
import { CategorySearchPage } from "@/components/pages";
import { filterData } from "@/context";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React from "react";

export const Route = createFileRoute("/categories/_categories/search/$id")({
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
      <>
        <CategorySearchPage />
      </>
    );
  },
});
