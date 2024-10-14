"use client";

import { TabsList, TabsTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  return (
    <TabsList
      className={cn(
        "flex flex-col items-start h-full w-full md:w-[200px] !bg-transparent justify-start ml-4",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <TabsTrigger
          className="w-full text-start justify-start"
          value={item.title}
        >
          {item.title}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
