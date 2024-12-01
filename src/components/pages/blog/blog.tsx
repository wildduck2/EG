import { Card } from "@/components/ui";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { article_data } from "./blog.constants";
import React from "react";
import { goods, form } from "@/assets";

export const Blog = () => {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col [&>div:not(:first-child)]:pt-3 [&>div:not(:first-child)]:pb-12 container min-h-screen lg:mt-[13rem]">
      <div className="relative z-[2] my-4">
        <h2 className={`font- text-[23px] gap-2`}>{t("blog")}</h2>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {article_data.map((data, i) => {
          return (
            <React.Fragment>
              <Link key={data.id} to={`/blog/${data.id}`}>
                <Card
                  className="grid w-full rounded-lg gap-2 p-3 h-[270px]"
                  key={i}
                >
                  <div className="w-full h-[200px]">
                    <img
                      src={data.article_picture}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="text-lg font-semibold leading-5 truncate">
                    {data.name}
                  </h4>
                </Card>
              </Link>
              {i === article_data.length - 1 && (
                <div className="flex gap-4 col-span-3">
                  <img
                    src={goods}
                    className="w-[322.2px] h-[270px] object-cover rounded-lg"
                  />
                  <img
                    src={form}
                    className="w-[322.2px] h-[270px] object-cover rounded-lg"
                  />
                  <img
                    src={goods}
                    className="w-[322.2px] h-[270px] object-cover rounded-lg"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </main>
  );
};

// {Array(8)
//   .fill(0)
//   .map((_, i) => (
//     <Skeleton className="grid w-full rounded-lg gap-2" key={i}>
//       <Skeleton className="w-full h-[200px]"></Skeleton>
//       sadfasdf
//     </Skeleton>
//   ))}
