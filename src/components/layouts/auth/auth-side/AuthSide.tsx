import { Logo, LogoWhite } from "@/assets";
import { Link } from "@tanstack/react-router";

export const AuthSide = () => {
  // <div className="layout" />
  return (
    <aside className="hidden lg:grid h-screen bg-red-700 w-1/2 p-12 pr-[8rem] relative palace-self-center">
      <div className="absolute inset-0 h-screen -z-1">
        <img
          className="h-full object-cover w-full object-center"
          src="https://images.pexels.com/photos/19332284/pexels-photo-19332284/free-photo-of-elegant-man-in-a-suit-posing-in-studio-on-red-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="flex flex-col items-start justify-between h-full relative z-2">
        <div className="top">
          <Link to="/home" className="logo">
            <img src={LogoWhite} className="w-28 h-auto" alt="Logo" />
          </Link>
        </div>
        {
          // <div className="">
          //   <blockquote className="flex flex-col gap-4">
          //     <p className="text-lg font-semibold text-accent">
          //       الأمر لا يتعلق فقط بأن تكون أفضل. يتعلق بأن تكون مختلفًا. عليك أن
          //       تعطي الناس سببًا لاختيار عملك.
          //     </p>
          //     <footer className="flex items-center gap-3 text-lg font-semibold text-accent">
          //       <img
          //         src="https://cdn.theorg.com/4ce8b31a-424b-42df-9f2c-40fb5f26256e_thumb.jpg"
          //         width={40}
          //         className="rounded-full"
          //         alt=""
          //       />
          //       - توم أبوت -
          //     </footer>
          //   </blockquote>
          // </div>
        }
      </div>
    </aside>
  );
};
