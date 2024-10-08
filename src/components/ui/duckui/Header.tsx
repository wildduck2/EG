"use client";

import React from "react";

import {
  filteredObject,
  NavCollabsedType,
  NavGroup,
  NavGroupProps,
  NavType,
} from "./nav-group";
import { Separator } from "./separator";

import { cn } from "@/lib/utils";

export type HeaderProps<T extends boolean> = {
  header: HeaderType;
  nav: NavGroupProps<T>;
  logo?: React.ReactElement;
  footer?: FooterType;
};

export interface HeaderType extends React.HtmlHTMLAttributes<HTMLDivElement> {
  isCollabsed?: boolean;
  position?: "side" | "top";
  sticky?: boolean;
}

export interface FooterType extends React.HtmlHTMLAttributes<HTMLDivElement> {
  buttons: React.ReactNode[];
}

const Header = <T extends boolean>({
  header,
  logo,
  nav,
  footer,
}: HeaderProps<T>) => {
  const { className, position, isCollabsed, sticky, ...props } = header;
  const { buttons, className: footerClassName, ...footerProps } = footer || {};
  const filteredKeys = filteredObject(["isCollabsed"], header);

  return (
    <header
      {...filteredKeys}
      className={cn(
        "py-2 flex",
        position === "side"
          ? "flex-col h-full"
          : position === "top"
            ? "items-center"
            : "",
        className,
      )}
      {...props}
    >
      <div
        className={cn("flex items-center gap-2", footerClassName)}
        {...footerProps}
      >
        {footer &&
          footer.buttons.map((button, idx) => (
            <React.Fragment key={idx}>{button}</React.Fragment>
          ))}
      </div>
      {logo && logo}
      {position === "side" && <Separator className="my-1" />}
      <NavGroup<T>
        position={position}
        nav={{ ...nav.nav, isCollabsed: isCollabsed } as NavType<true>}
        navigationKeys={nav.navigationKeys}
      />
      {position === "side" && <Separator className="my-1" />}
    </header>
  );
};

Header.displayName = "Header";

export { Header };
