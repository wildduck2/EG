"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { Separator } from "./separator";
import { RootRoute, useLocation, useNavigate } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import { hi, NavigationHeaderLooping } from "@/components/layouts";

export function groupArrays<T>(numbers: number[], headers: T[]): T[][] {
  const result: T[][] = [];
  let index = 0;

  for (const num of numbers) {
    const headerGroup = headers.slice(index, index + num);
    result.push(headerGroup);
    index += num;
  }

  return result;
}

export const filteredObject = <T extends Record<string, any>>(
  keys: string[],
  obj: T,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key)),
  ) as Partial<T>;
};

type NavGroupProps<T extends boolean> = {
  navigationKeys: {
    data: ButtonProps[];
    activeKey?: ButtonProps;
  } & ButtonProps;
  nav: NavType<T>;
  position?: "side" | "top";
};

type NavType<T extends boolean> = NavCollabsableType<T> & {
  group: number[];
  router: any; //AppRouterInstance
  pathname: string;
  className?: string;
};

type NavCollabsableType<K> = K extends true
  ? NavCollabsedType
  : NavNotCollabsedType;

interface NavCollabsedType {
  isCollabsed?: boolean;
}

interface NavNotCollabsedType {}

const NavGroup = <T extends boolean>({
  navigationKeys,
  nav,
  position,
}: NavGroupProps<T>) => {
  const {
    data,
    activeKey,
    className: navKeysClassName,
    variant: navKeysVariant,
    ...navKeysProps
  } = navigationKeys ?? {};
  const {
    className: activeKeyClassName,
    variant: activeKeyVariant,
    ...activeKeyProps
  } = activeKey ?? {};
  const grouped = groupArrays<ButtonProps>(nav.group, data);
  const navIsCollabsed = (nav as NavCollabsedType).isCollabsed;
  const filteredKeys = filteredObject(
    ["group", "router", "location", "isCollabsed"],
    nav,
  );
  const navigator = useNavigate();
  const location = useLocation();

  const variants = {
    default: position == "side" ? "grid items-center" : "flex",
  };

  return (
    <NavigationMenu
      className={cn("h-full", variants.default, nav.className)}
      {...filteredKeys}
    >
      {grouped.map((keyGroup, idx) => (
        <React.Fragment key={idx}>
          <NavigationMenuList
            className={cn(
              variants.default,
              "px-2 py-1",
              navIsCollabsed ? "w-fit" : "w-full",
            )}
          >
            {keyGroup.map((key, idx) => {
              const {
                className,
                isCollapsed,
                onClick,
                variant,
                children,
                icon,
                route,
                state,
                ...props
              } = key;
              return (
                <NavigationMenuItem key={idx} className="w-full">
                  <NavigationMenuTrigger className="w-fit bg-transparent p-0 [&_svg]:hidden">
                    <Button
                      key={idx}
                      icon={key.icon}
                      variant={
                        nav.pathname === key.route
                          ? activeKeyVariant || "secondary"
                          : position === "top"
                            ? navKeysVariant || "ghost"
                            : navKeysVariant || variant || "ghost"
                      }
                      isCollapsed={navIsCollabsed ? navIsCollabsed : false}
                      onClick={() => {
                        navigator({ to: route, state: state });
                        localStorage.setItem("branch", "1");
                      }}
                      className={cn(
                        !navIsCollabsed && "w-full justify-between",
                        position === "top" && "",
                        key.className,
                        navKeysClassName,
                        activeKeyClassName,
                      )}
                      {...props}
                      {...navKeysProps}
                      {...activeKeyProps}
                    >
                      {children}
                    </Button>
                  </NavigationMenuTrigger>
                  {
                    // <NavigationMenuContent className="w-[1100px] left-1/2 -translate-x-1/2 p-8 z-[1000]">
                    //   <NavigationHeaderLooping
                    //     headerNavigationData={hi}
                    //     satatus="loading"
                    //   />
                    // </NavigationMenuContent>
                  }
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
          {idx !== grouped.length - 1 && position === "side" && (
            <Separator className="my-1" />
          )}
        </React.Fragment>
      ))}
    </NavigationMenu>
  );
};

NavGroup.displayName = "NavGroup";

export {
  NavGroup,
  type NavGroupProps,
  type NavType,
  type NavCollabsableType,
  type NavCollabsedType,
  type NavNotCollabsedType,
};
