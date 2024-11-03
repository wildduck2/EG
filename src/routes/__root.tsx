import * as React from "react";
import {
    Outlet,
    ScrollRestoration,
    createRootRoute,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";
import { getUser } from "@/components/layouts/account/user-profile";

export const Route = createRootRoute({
    beforeLoad: async () => {
        await getUser();
    },
    component: () => {
        const { i18n } = useTranslation();

        const lang = localStorage.getItem("i18nextLng");
        React.useEffect(() => {
            i18n.changeLanguage(lang?.split("-")[0] ?? "en");
            if (lang === "ar") {
                document.body.classList.add("rtl");
            } else {
                document.body.classList.remove("rtl");
            }
        }, []);

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
