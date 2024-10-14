import {
  CardPreview,
  CardPreviewContent,
  CardPreviewHeader,
  CardPreviewTitle,
} from "@/components/ui";
import { Button } from "../ui";
import { IProduct } from "../pages";
import { ProductCard } from "./AddContent";

export interface ProductsPreviewProps {
  title?: string;
  data?: IProduct[];
  buttonContent?: string;
}

const ProductsPreview: React.FC<ProductsPreviewProps> = ({
  title,
  data,
  buttonContent,
}) => {
  return (
    <CardPreview>
      <CardPreviewHeader>
        <CardPreviewTitle>{title}</CardPreviewTitle>
        <Button
          variant="outline"
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
        >
          {buttonContent}
        </Button>
      </CardPreviewHeader>
      <CardPreviewContent>
        {data.map((item, index) => {
          return <ProductCard data={item} key={index} />;
        })}
      </CardPreviewContent>
    </CardPreview>
  );
};

ProductsPreview.displayName = "ProductsPreview";

export { ProductsPreview };
