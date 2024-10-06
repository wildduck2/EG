import React from "react";
import Logo from "../../assets/logo-01.png";
import { Badge } from "../ui";
import { Card, CardContent, CardHeader } from "../ui/duckui/card";
import { Heart, MapPinXInside, Star } from "lucide-react";

interface AddContentProps {
  trusted: boolean;
  img: string;
  price: string;
  title: string;
  location: string;
  date: string;
  offers: boolean;
  alt: string;
}

export const AddContent: React.FC<AddContentProps> = ({
  trusted = false,
  img,
  alt,
  price,
  title,
  location,
  date,
  offers = false,
}) => {
  const [loved, setLoved] = React.useState(false);
  return (
    <Card className="hover:border-white border border-[#CFD4DD] transition hover:shadow-[0px_0px_12px_2px_rgba(17,12,35,0.05)] ">
      <CardHeader className="p-0 relative h-[300px] overflow-hidden">
        <img src={img} alt={alt} className="h-full rounded-t-md" />
        {trusted && offers && (
          <Badge className="text-white text-[10px] flex item-center gap-2 rounded-full font-semibold absolute top-4 right-4 bg-blue-400 px-2 py-1 [&_svg]:w-4 hover:bg-blue-500/90 pointer-events-none">
            <span>موثوق</span>
            <Star
              fill={offers ? "orange" : "white"}
              color={offers ? "orange" : "white"}
            />
          </Badge>
        )}
        {offers && (
          <Badge
            className="text-white text-[10px] flex item-center gap-2 rounded-full font-semibold absolute top-4 left-4 bg-red-400 px-2 py-1 [&_svg]:w-4 hover:bg-red-500/95 cursor-pointer"
            onClick={() => setLoved(!loved)}
          >
            <Heart className={loved ? "fill-red-700 stroke-red-700" : ""} />
          </Badge>
        )}
        <div className="absolute bottom-4 left-4">
          <img src={Logo} alt="logo" width="40px" />
        </div>
        <div className="absolute top-4 left-4"></div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex justify-start items-center gap-2">
            <span className="text-[#e60000] font-semibold text-md">
              {price} ج.م
            </span>
            <p className="text-gray-500 text-[12px]">{date}</p>
          </div>
        </div>
        <h4 className="text-[14px] font-medium m-0">{title}</h4>
        <div className="flex justify-start items-center gap-1 mt-1 text-gray-500">
          <MapPinXInside className="w-[15px]" />
          <span className=" text-[10px] font-medium">{location}</span>
        </div>
      </CardContent>
      {/* <CardFooter className='flex justify-between items-center h-[60px]'>
                <p className='text-gray-500 text-[11px]'>{date}</p>
                {offers && <Link className='bg-orange-400 rounded-lg px-5 py-2 text-[13px]'>اعلان مميز</Link>}
            </CardFooter> */}
    </Card>
  );
};
