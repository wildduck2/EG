// import { Link } from "@tanstack/react-router"
import React from "react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

interface specialoffersProps {
  dataType: any;
  data: string;
}

export const SpecialOffersHead: React.FC<specialoffersProps> = ({
  dataType,
}: {
  dataType: (data: unknown) => void;
}) => {
  const [filter, setFilter] = React.useState("special");

  const handleData = (data: unknown) => {
    dataType(data);
    {
      /* NOTE: You have to fix this */
    }

    setFilter(data as unknown as string);
  };

  const data = [
    {
      id: 1,
      category: "special",
      name: "مميزة",
    },
    {
      id: 2,
      category: "lowPrice",
      name: "الاقل سعرا",
    },
    {
      id: 3,
      category: "highPrice",
      name: "الاعلى سعرا",
    },
  ];

  return (
    <div className="py-8">
      <ul className="flex justify-start items-center gap-3">
        {data.map((e, i) => (
          <li key={i}>
            <Button
              variant="outline"
              className={cn(
                "text-[#e60000] font-semibold border cursor-pointer px-5 py-1 rounded-md border-[#e60000] hover:bg-[#e60000] hover:text-white",
                filter === e.category && "bg-[#e60000] text-white",
              )}
              onClick={() => handleData(e.category)}
            >
              {e.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
