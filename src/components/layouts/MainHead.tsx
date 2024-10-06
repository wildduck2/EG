import { Link } from "@tanstack/react-router"
import { Zap } from "lucide-react";

interface MainHeadProps {
    title: string;
    button: string;
    offers: boolean;
}

export const MainHead: React.FC<MainHeadProps> = ({title , button ,offers = false}) => {
    return(
        <div className="flex justify-between items-center mb-12">
           <div className="relative z-[2]">
              <h2 className={`font-bold text-[23px] flex justify-center items-center gap-2 ${offers && 'text-[#e60000]'}`}>{offers && <Zap className="border border-[#e60000] rounded-full p-1 text-[9px]" /> } {title}</h2>
              <span className="absolute bottom-[-6px] right-0 w-full h-full z-[-1]">
                        <svg width="100%" height="76" viewBox="0 0 500 76" fill="none" xmlns="http://www.w3.org/2000/svg" className="customrotate">
                            <path d="M498.683 58.6692C493.961 58.6148 489.08 59.4491 484.546 58.3349C453.376 50.6963 422.498 41.2409 391.057 35.1763C359.373 29.0726 327.349 24.6373 295.061 22.4098C266.818 20.4446 238.174 21.0873 209.434 23.332C184.926 25.236 160.001 31.2924 135.294 35.0984C98.7923 40.774 62.0451 53.6532 25.2483 68.1771C20.1219 70.2025 14.999 73.3187 9.87261 75.3441C5.20237 77.1966 1.92122 74.8416 0.602737 66.2618C-0.918857 56.2782 0.58571 51.351 6.46582 49.4114C41.4012 38.0346 76.387 25.7868 111.276 15.809C128.785 10.8128 146.17 9.69965 163.568 7.39306C177.448 5.54164 191.5 2.83883 205.038 3.67506C213.535 4.22969 222.101 0.78737 230.468 0.371825C249.262 -0.515226 267.815 0.773936 286.491 0.957878C297.289 1.07314 308.184 0.360146 318.916 0.886742C328.518 1.33747 338.073 2.41355 347.456 4.34103C352.603 5.41304 357.291 9.11888 362.34 10.9135C364.484 11.6795 367.233 12.1205 369.308 10.2032C378.124 2.08935 382.758 17.0378 391.736 13.591C402.411 9.46729 413 17.0032 423.577 19.72C429.127 21.1731 434.706 22.6661 440.055 25.0363C447.142 28.1426 453.961 32.3659 461.015 35.5722C463.213 36.5578 466.105 34.7716 468.213 35.9887C471.921 38.1308 475.107 42.2989 478.844 44.3752C485.583 48.0936 492.54 50.8977 499.42 54.0761C499.178 55.5843 498.918 57.0897 498.659 58.5952L498.683 58.6692Z" fill="#E60000"/>
                            </svg>

                        </span>           </div>
           <Link className="border border-[#e60000] text-[15px] font-semibold py-2 px-8 rounded-md text-[#e60000] transition-all hover:bg-[#e60000] hover:text-white">{button}</Link>
       </div>
    )
}