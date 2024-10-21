import { CategoryPageWrapper } from "@/components/layouts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui";
import { Home } from "lucide-react";

export const Categories = () => {
  return (
    <main className="flex flex-col py-8 container min-h-screen lg:mt-[17rem]">
      <Breadcrumb className="mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">الرئيسيه</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/docs/components">منتجات</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-red-400 font-bold">
              تكنولوجيا المعلومات
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CategoryPageWrapper />
    </main>
  );
};
