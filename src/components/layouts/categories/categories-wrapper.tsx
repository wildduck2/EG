import { get_categories } from "@/components/layouts";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CategoriesSkeleton } from "./categories-wrapper.skeleton";

export const CategoriesWrapper = () => {
  const route = useNavigate();

  // Translate Api
  const { t } = useTranslation();

  // Query Categories
  const { data, status } = useQuery({
    queryKey: ["categories"],
    queryFn: get_categories,
  });

  if (status === "pending") {
    return <CategoriesSkeleton />;
  }

  if (status === "success" && data) {
    return (
      <div className="py-4 lg:py-12">
        <div>
          <div className="flex justify-start items-center mb-7">
            <div className="relative z-[2]">
              <h2
                className={`font- text-[23px] flex justify-center items-center gap-2`}
              >
                {t("categoriesTitle")}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[1.5rem] my-4">
            {data?.map((e, i) => (
              <Link
                key={e.id}
                className="flex flex-col justify-center items-center w-full rounded-lg gap-2"
                to={`/categories/${e.id}`}
                params={{
                  id: e.id.toString(),
                }}
                state={e as any}
              >
                <img
                  src={process.env.BACKEND__BASE_UPLOAD_URL + "/" + e.image}
                  alt={e.name}
                  className="rounded full size-[250px]"
                />
                <h4 className="text-center mt-0 font-semibold text-md transition-colors duration-300 ease-in-out group-hover:text-[#ffc223]">
                  {e.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

// {
// <div className="flex  gap-2 px-2">
//   {categoryData.slice(0, 6).map((item, idx) => (
//     <Toggle
//       className="border border-border border-solid h-fit px-4 py-2 rounded-lg"
//       key={item.id}
//     >
//       {item.name}
//     </Toggle>
//   ))}
// </div>
// }
