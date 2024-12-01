import { useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

import { HeaderDesktopMenu } from "./header-desktop-menu";
import { HeaderTop } from "./header-top";
import { HeaderDesktopMain } from "./header-desktop-main";

export const Header = () => {
  const location = useLocation();
  const ifLocation =
    location.pathname !== "/account/trader-profiles" ||
    location.pathname.toString().includes("/account/trader2");

  return (
    <>
      <header
        className={cn(
          "lg:fixed top-0 xl:left-1/2 xl:-translate-x-1/2 w-full z-50 mx-auto place-self-center",
          ifLocation && "border-border border-solid border-b",
        )}
      >
        <div className="flex flex-col items-cetner gap-2 container  bg-background ">
          {/* Header Top */}
          <HeaderTop />

          {/* Header Desktop Main */}
          <HeaderDesktopMain />

          {/* Header Desktop Menu */}
          <HeaderDesktopMenu />
        </div>
      </header>
    </>
  );
};
