import { Separator } from "@/components/ui";
import { TraderProfileAds } from "../trader-profile-ads";
import { useLocation } from "@tanstack/react-router";
import { User } from "../../home/ad-item-card";
import {
  Facebook,
  img1,
  img2,
  LinkedIn,
  ticktock,
  Whatsapp,
  x,
} from "@/assets";
import { banners } from "@/main";
import { useAtom } from "jotai";
import { filterData } from "@/context";

export const TraderProfile = ({ id }: { id: string }) => {
  const { state } = useLocation();
  const user = (state as any).user as User;

  const [filter_data, setFilterData] = useAtom(filterData);

  return (
    user?.name ||
    (user?.company_name && (
      <section className="flex gap-8 items-start my-8 min-h-[63vh]">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-8 items-center">
            <img
              src={
                (user?.image &&
                  process.env.BACKEND__BASE_UPLOAD_URL + "/" + user?.image) ||
                (user?.slug &&
                  process.env.BACKEND__BASE_UPLOAD_URL + "/" + user?.slug) ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLMI5YxZE03Vnj-s-sth2_JxlPd30Zy7yEGg&s"
              }
              className="w-36 h-36 rounded-full border"
              alt="map"
            />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-semibold">
                  {user?.name || user?.company_name}
                </h2>

                <p className="text-primary/60 text-sm">{user?.created_at}</p>
              </div>
              <p className="text-primary/80 text-lg">{user?.description}</p>
            </div>
            <div className="flex gap-10 flex-col">
              <div className="flex items-center gap-12">
                <p className="text-xl">
                  {
                    filter_data.categories.find(
                      (e) => e.id === user?.category_id,
                    )?.name
                  }
                </p>

                <p className="text-xl">
                  {
                    filter_data.subcategories.find(
                      (e) => e.id === user?.subcategory_id,
                    )?.name
                  }
                </p>
              </div>

              <div className="flex items-center gap-12">
                <p className="text-xl">
                  {
                    filter_data.governorates.find(
                      (e) => e.id === user?.governorate_id,
                    )?.name
                  }
                </p>

                <p className="text-xl">
                  {
                    filter_data.regions.find((e) => e.id === user?.region_id)
                      ?.name
                  }
                </p>
              </div>
            </div>
          </div>
          <div>
            <div>
              <ul className="flex items-center gap-8 lg:my-4">
                {user.instagram && (
                  <li>
                    <a href={user.instagram} target="_blank">
                      <img
                        className="w-[3.2rem] h-[3.2rem] "
                        src={Whatsapp}
                        alt=""
                      />
                    </a>
                  </li>
                )}
                {user.facebook && (
                  <li>
                    <a href={user.facebook} target="_blank">
                      <img className="size-[3.2rem]" src={Facebook} alt="" />
                    </a>
                  </li>
                )}
                {user.twitter && (
                  <li>
                    <a href={user.twitter} target="_blank">
                      <img className="size-[3.2rem]" src={x} alt="" />
                    </a>
                  </li>
                )}
                {user.tiktok && (
                  <li>
                    <a href={user.tiktok} target="_blank">
                      <img className="size-[3.2rem]" src={ticktock} alt="" />
                    </a>
                  </li>
                )}
                <p className="text-primary/90 text-lg">{user?.phone_number}</p>
                <p className="text-primary/90 text-lg">{user?.location_map}</p>
                <p className="text-primary/90 text-lg">{user?.sms}</p>
              </ul>
            </div>
          </div>
          {user?.name && <Separator className="px-2" />}

          {user?.name && <TraderProfileAds id={id || user?.id} />}
        </div>
      </section>
    ))
  );
};
