import { Footer, get_filter_data, Header } from "@/components/layouts";
import { Home } from "@/components/pages";
import { filterData } from "@/context";
import { banners } from "@/main";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { atom, useAtom } from "jotai";
import React from "react";

export const Route = createFileRoute("/")({
  component: () => {
    const [filter_data, setFilterData] = useAtom(filterData);
    const [_, setBanners] = useAtom(banners);

    React.useEffect(() => {
      (async () => {
        const res = await get_filter_data();

        if (!res) return;
        setFilterData((old) => res);
      })();

      axios
        .get(process.env.BACKEND__BASE_URL + "/client/websecondbanners")
        .then((res) => {
          localStorage.setItem("banners", JSON.stringify(res.data.data));
          setBanners(res.data.data);
        });
    }, []);

    return (
      <>
        <Header />
        <Home />
        <Footer />
      </>
    );
  },
});
