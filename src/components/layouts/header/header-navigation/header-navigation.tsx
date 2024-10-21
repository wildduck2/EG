import { Link } from "@tanstack/react-router";
import { headerNavigationDataTypes } from "./header-navigation.skeleton.types";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui";

export const NavigationHeaderLooping = ({
  headerNavigationData,
}: headerNavigationDataTypes) => {
  return (
    <ul className="flex w-[1100px]">
      {headerNavigationData?.map((item, index) => {
        return (
          <li key={index} className="flex gap-16">
            {item.map((child) => {
              return child.map((item, index) => {
                return (
                  <ul key={index} className="flex flex-col !gap-2">
                    {item.map((item, index) => {
                      return (
                        <li key={index} className="flex flex-col">
                          {index === 0 ? (
                            <h4 className="font-bold">{item}</h4>
                          ) : (
                            <li className="flex flex-col gap-1">
                              {
                                // @ts-ignore
                                item.map((item, index) => {
                                  return (
                                    <Link
                                      to={item}
                                      className={cn(
                                        buttonVariants({ variant: "link" }),
                                        "text-sm p-0 justify-start h-fit text-accent-foreground",
                                      )}
                                    >
                                      {item}
                                    </Link>
                                  );
                                })
                              }
                            </li>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              });
            })}
          </li>
        );
      })}
    </ul>
  );
};
