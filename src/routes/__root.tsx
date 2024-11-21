import * as React from "react";
import {
  Outlet,
  ScrollRestoration,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
import { getUser } from "@/components/layouts/account/user-profile";
import { get_filter_data } from "@/components/layouts";
import { useAtom } from "jotai";
import { banners } from "@/main";
import { filterData } from "@/context";
import axios from "axios";

export const Route = createRootRoute({
  beforeLoad: async () => {
    await getUser();
  },
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
    const { i18n } = useTranslation();

    const lang = localStorage.getItem("i18nextLng");
    React.useEffect(() => {
      console.log(lang);
      i18n.changeLanguage(lang ?? "ar");
      if (lang === "ar") {
        document.body.classList.add("rtl");
      } else {
        document.body.classList.remove("rtl");
      }
    }, []);

    // <TanStackRouterDevtools />

    return (
      <React.Fragment>
        <ScrollRestoration />
        <Outlet />
      </React.Fragment>
    );
  },
});
// <ReactQueryDevtools initialIsOpen={false} position="left" />
// <ScrollArea className="h-screen">
//         <div className="h-full" dir={i18n.dir()}></div>
//         <ScrollToTop />
//       </ScrollArea>
