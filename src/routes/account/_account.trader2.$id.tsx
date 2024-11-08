import { Facebook, ticktock, Whatsapp, x } from "@/assets";
import { TraderProfileAds, User } from "@/components/layouts";
import { TraderProfilePage } from "@/components/pages";
import { Button, Separator } from "@/components/ui";
import { filterData } from "@/context";
import { queryClient } from "@/main";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { MessageSquare, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

type TraderRouteState = {
  isVIP: boolean;
};

export const Route = createFileRoute("/account/_account/trader2/$id")({
  component: () => {
    const { state } = useLocation();
    const user = (state as any).user as User;
    const { t } = useTranslation();
    const [filter_data, setFilterData] = useAtom(filterData);

    return (
      <main
        className="container flex-col pm-4 lg:pt-[17rem] grid place-content-center"
        // dir="rtl"
      >
        {user?.name ||
          (user?.company_name && (
            <section className="flex gap-4 items-start my-8 min-h-[63vh] flex-col">
              <img
                src={
                  (user?.image &&
                    process.env.BACKEND__BASE_UPLOAD_URL + "/" + user?.image) ||
                  (user?.slug &&
                    process.env.BACKEND__BASE_UPLOAD_URL + "/" + user?.slug) ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
                }
                className="w-36 h-36 rounded-full border mx-auto"
                alt="map"
              />
              <h2 className="text-3xl font-semibold text-center w-full">
                {user?.name || user?.company_name}
              </h2>
              <div className="flex flex-col gap-8 w-full">
                <p className="text-primary/60 text-lg text-center">
                  {t("joined")}: {user?.created_at}
                </p>
                <p className="text-primary/80 text-lg text-center">
                  {t("description")}: {user?.description}
                </p>
                <div className="flex gap-12 items-center">
                  <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4"></div>
                  </div>
                  <div className="flex gap-14 flex-col place-content-center mx-auto">
                    <div className="flex items-center gap-12">
                      <p className="text-xl">
                        {t("category")}:{" "}
                        {
                          filter_data.categories.find(
                            (e) => e.id === user?.category_id,
                          )?.name
                        }
                      </p>

                      <p className="text-xl">
                        {t("subcategory")}:
                        {
                          filter_data.subcategories.find(
                            (e) => e.id === user?.subcategory_id,
                          )?.name
                        }
                      </p>
                    </div>

                    <div className="flex items-center gap-12">
                      <p className="text-xl">
                        {t("governorate")}:{" "}
                        {
                          filter_data.governorates.find(
                            (e) => e.id === user?.governorate_id,
                          )?.name
                        }
                      </p>

                      <p className="text-xl">
                        {t("region")}:{" "}
                        {
                          filter_data.regions.find(
                            (e) => e.id === user?.region_id,
                          )?.name
                        }
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <ul className="flex items-center gap-8 lg:my-4">
                      <p className="text-primary/90 text-lg">
                        {user?.phone_number}
                      </p>
                      <p className="text-primary/90 text-lg">
                        {user?.location_map}
                      </p>
                      <p className="text-primary/90 text-lg">{user?.sms}</p>
                    </ul>
                    <ul className="flex items-center gap-8 lg:my-4 place-content-center">
                      <a href={`tel:${user.phone_number}`} target="_blank">
                        <Button
                          variant={"default"}
                          className="w-full w-[50px] h-[50px] grid-2"
                          icon={{
                            icon: Phone,
                          }}
                        ></Button>
                      </a>
                      <a
                        href={`https://wa.me/${user.phone_number}`}
                        target="_blank"
                      >
                        <Button
                          variant={"default"}
                          className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6 bg-green-400 hover:bg-green-500"
                          icon={{
                            icon: FaWhatsapp,
                          }}
                        />
                      </a>
                      <a
                        href={`https://wa.me/${user.phone_number}`}
                        target="_blank"
                      >
                        <Button
                          variant={"default"}
                          className="md:w-[50px] h-[50px] [&_svg]:w-6 [&_svg]:h-6"
                          icon={{
                            icon: MessageSquare,
                          }}
                        ></Button>
                      </a>

                      {user.tiktok && (
                        <li>
                          <a href={user.tiktok} target="_blank">
                            <img
                              className="size-[3.2rem]"
                              src={ticktock}
                              alt=""
                            />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}
      </main>
    );
  },
});
