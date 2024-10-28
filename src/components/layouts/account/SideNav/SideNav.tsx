"use client";

import { TabsList, TabsTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { user } from "../../auth";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const [userData] = useAtom(user);
  return (
    <TabsList
      className={cn(
        "grid grid-cols-2 items-start h-full w-full md:w-[200px] !bg-transparent justify-start mr-4 ikl-4 gap-4 md:grid-cols-1 lg:flex lg:flex-col mb-4",
        className,
      )}
      {...props}
    >
      {items
        .filter((item) => {
          if (item.title !== "verify your account") {
            return item;
          }

          if (item.title === "verify your account" && !userData?.verify) {
            return item;
          }
        })
        .map((item) => (
          <TabsTrigger
            className="w-full text-start justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground capitalize"
            value={item.title}
          >
            {item.children}
          </TabsTrigger>
        ))}
    </TabsList>
  );
}
