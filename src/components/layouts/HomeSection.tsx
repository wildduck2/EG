import { Link } from "@tanstack/react-router";
import src2 from "../../assets/bg.png";
import { useState } from "react";
import { FireExtinguisher } from "@/assets";

interface ProductCardProps {
  title: string;
  src: string;
  alt: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, src, alt }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link className="flex flex-col justify-center items-center">
      <div
        className={`relative rounded-full w-[120px] h-[100px] flex justify-center items-center`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={FireExtinguisher}
          alt={alt}
          className="rounded-full w-[90px] "
        />
        <img
          src={
            "https://images.pexels.com/photos/1631918/pexels-photo-1631918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt={alt}
          className={`absolute z-[-1] w-[120px] scale-0 transition-all ${hovered ? "scale-125" : "scale-0"}`}
        />
      </div>
      <h4
        className={`text-center mt-0 font-semibold text-sm transition-all ${hovered ? "text-[#ffc223]" : "text-black"}`}
      >
        {title}
      </h4>
    </Link>
  );
};

ProductCard.displayName = "ProductCard";

export { ProductCard };
