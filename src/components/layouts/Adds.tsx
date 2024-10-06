// @ts-nocheck




import { AddContent } from "./AddContent"
import { MainHead } from "./MainHead"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../ui/duckui/carousel"
  import Autoplay from "embla-carousel-autoplay";
import { Link } from "@tanstack/react-router";
import { SpecialOffersHead } from "./SpecialOffersHead";
import { useState } from "react";

  interface AddsProps {
    sectionTitle:string;
    button: string;
    headOffers: boolean;
    trusted: boolean;
    img: string;
    alt:string;
    price: string;
    title: string;
    location: string;
    date: string;
    offers: boolean;
    data: Array<any>;
    bg: string
  }

export const Adds: React.FC <AddsProps> = ({sectionTitle ,button ,headOffers = false , data , bg = 'bg-white'}) => {

 

    return(
        <div className={`py-12  ${bg}`}>
             <div className="px-8 mx-28">
                   {!headOffers && <MainHead title={sectionTitle} button={button} offers={headOffers} />}

                    {headOffers && <SpecialOffersHead dataType={handleData} />}
                   
              
                   <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
                        {data?.map((e , i) => (
                            <div className="" key={i}>
                            <AddContent 
                                trusted = {e.trusted}
                                img={e.img}
                                alt={e.alt}
                                price= {e.price}
                                title={e.title}
                                location={e.location}
                                offers={e.offers}
                                date= {e.date}
                                />
                            </div>
                        ))}
                    </div>
             </div>
        </div>
    )
}