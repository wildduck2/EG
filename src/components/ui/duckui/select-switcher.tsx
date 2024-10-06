import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItemLeftCheck,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

import { cn } from "@/lib/utils";
import { Cloudy, Inbox, Languages, Mail } from "lucide-react";

export interface SelectSwitcherContentType
  extends React.ComponentPropsWithoutRef<typeof SelectContent> {
  data: AccountType[];
}

export interface SelectSwitcherProps {
  wrapper?: React.ComponentPropsWithoutRef<typeof Select>;
  isCollapsed?: boolean;
  trigger?: React.ComponentPropsWithoutRef<typeof SelectTrigger>;
  content: SelectSwitcherContentType;
}

export interface AccountType
  extends React.ComponentPropsWithoutRef<typeof SelectItemLeftCheck> {
  label: string;
  icon?: typeof Inbox;
  name: string;
}

export function SelectSwitcher({
  wrapper,
  trigger,
  content,
  isCollapsed = false,
}: SelectSwitcherProps) {
  const { onValueChange, defaultValue, ...props } = wrapper ?? {};
  const { data, className: contentClassName, ...contentProps } = content ?? {};
  const { className: triggerClassName, ...triggerProps } = trigger ?? {};

  console.log(data);

  const [selectedAccount, setSelectedAccount] = React.useState<string>(
    defaultValue || data[0].name,
  );
  const IconSelected =
    data.find((account) => account.name === selectedAccount)?.icon || Languages;

  return (
    <Tooltip delayDuration={0}>
      <Select
        defaultValue={selectedAccount}
        onValueChange={(value) => {
          onValueChange && onValueChange(value);
          setSelectedAccount(value);
        }}
        {...props}
      >
        <TooltipTrigger asChild>
          <SelectTrigger
            className={cn(
              "account__switcher flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 w-[250px] h-10 px-4",
              isCollapsed &&
                "flex h-10 w-10 items-center justify-center p-2 [&>span]:w-auto [&>svg]:hidden",
              triggerClassName,
            )}
            aria-label="Select account"
            {...triggerProps}
          >
            <SelectValue placeholder="Select an account" className="w-auto">
              <IconSelected className="!h-[1.15rem] !w-[1.15rem]" />
              <span
                className={cn(
                  "ml-2 truncate max-w-[180px]",
                  isCollapsed && "hidden",
                )}
              >
                {
                  data.find((account) => account.name === selectedAccount)
                    ?.label
                }
              </span>
            </SelectValue>
          </SelectTrigger>
        </TooltipTrigger>
        <SelectContent className={cn(contentClassName)} {...contentProps}>
          {data.map((account) => (
            <SelectItemLeftCheck key={account.name} value={account.name}>
              <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                {account.icon && <account.icon />}
                {account.name}
              </div>
            </SelectItemLeftCheck>
          ))}
        </SelectContent>
      </Select>
      <TooltipContent side="right" className="flex items-center gap-4 z-50">
        {data.find((account) => account.name === selectedAccount)?.label}
      </TooltipContent>
    </Tooltip>
  );
}
