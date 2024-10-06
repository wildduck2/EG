import { Adds } from "./Adds";
import add1 from "../../assets/images.jpg";
import add2 from "../../assets/AdobeStock_279981484-1-e1698180705508-1024x614.jpeg";
import add3 from "../../assets/images (1).jpg";

export const AirConditioning = () => {
  const data = [
    {
      trusted: false,
      img: add1,
      alt: add1,
      price: "330.00",
      title: "مواسير سملس جدول 40",
      offers: false,
      location: "القاهره / شارع الجمهورية",
      date: "منذ 1 ايام",
    },
    {
      trusted: true,
      img: add2,
      alt: add1,
      price: "330.00",
      title: "مواسير سملس جدول 40",
      offers: false,
      location: "القاهره / شارع الجمهورية",
      date: "منذ 1 ايام",
    },
    {
      trusted: true,
      img: add3,
      alt: add1,
      price: "330.00",
      title: "مواسير سملس جدول 40",
      offers: true,
      location: "القاهره / شارع الجمهورية",
      date: "منذ 1 ايام",
    },
    {
      trusted: true,
      img: add3,
      alt: add1,
      price: "330.00",
      title: "مواسير سملس جدول 40",
      offers: true,
      location: "القاهره / شارع الجمهورية",
      date: "منذ 1 ايام",
    },
  ];

  return (
    // @ts-ignore
    <Adds sectionTitle="التكييف المركزي" button="عرض المزيد" data={data} />
  );
};
