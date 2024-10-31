import { CategoriesWrapper } from "@/components/layouts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const CategoriesPage = () => {
  const { t } = useTranslation();
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
            <BreadcrumbPage className="text-red-400 font-bold">
              <Link to="/categories">{t("categories")}</Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CategoriesWrapper />
    </main>
  );
};
