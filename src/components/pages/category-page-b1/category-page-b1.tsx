import { CategoryItemType, CategoryPageWrapper } from "@/components/layouts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import { Link, useLocation, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const CategoryPageB1 = () => {
  const { category } = useParams({ strict: false });
  const { state }: { state: CategoryItemType } = useLocation();
  console.log(state);
  const { t, i18n } = useTranslation();

  return (
    <main className="flex flex-col py-8 container min-h-screen lg:mt-[17rem]">
      <Breadcrumb className="mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">{t("home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/categories">{t("categories")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-red-400 font-bold">
              {i18n.dir() === "rtl" ? state.name : state.name_en}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CategoryPageWrapper
        name={i18n.dir() === "rtl" ? state.name : state.name_en}
        id={category ?? state.id.toString()}
      />
    </main>
  );
};
