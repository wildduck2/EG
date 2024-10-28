import { CategorySearch, get_filter_data } from "@/components/layouts";
import { useParams } from "@tanstack/react-router";

export const CategorySearchPage = () => {
  const { id } = useParams({ strict: false });

  return (
    <>
      <main className="container flex flex-col pm-4 lg:pt-[17rem]">
        <CategorySearch id={id} />
      </main>
    </>
  );
};
