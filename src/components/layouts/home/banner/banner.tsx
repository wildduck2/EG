import { cn } from "@/lib/utils";
import React from "react";
import { BannerSKeleton } from "./banner.skeleton";

export interface BannerProps extends React.HTMLProps<HTMLDivElement> {}
export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, children, ...props }, ref) => {
    return <BannerSKeleton />;

    return (
      <div
        className={cn("h-[230px] rounded-xl", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  },
);
