import { Link } from "@tanstack/react-router";
import src2 from '../../assets/bg.png'
import { useState } from "react";

interface HomeSectionProps {
    title: string;
    src: string;
    alt: string;
}
export const HomeSection: React.FC < HomeSectionProps > = ({title, src, alt}) => {

    const [hovered, setHovered] = useState(false)
    
    return (
        <Link className="flex flex-col justify-center items-center">
            <div className={`relative rounded-full w-[120px] h-[100px] flex justify-center items-center`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <img src={src} alt={alt} className="rounded-full w-[90px] "/>
                <img src={src2} alt={alt} className={`absolute z-[-1] w-[120px] scale-0 transition-all ${hovered ? 'scale-125' : 'scale-0'}`}/>
            </div>
                <h4 className={`text-center mt-0 font-semibold text-sm transition-all ${hovered ? 'text-[#ffc223]' : 'text-black' }`}>{title}</h4>
        </Link>
    )
}
