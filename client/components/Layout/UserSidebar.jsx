import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaMusic } from "react-icons/fa";
import { IoGameControllerOutline } from "react-icons/io5";

const UserSidebar = () => {
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [current]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div
      className={`${
        open ? "w-[230px]" : "w-20"
      } duration-200 h-screen bg-[#25292A] relative p-5`}
    >
      <div
        onClick={toggleSidebar}
        className={`w-6 h-6 flex items-center cursor-pointer justify-center duration-700 border-[#25292A] border ease-in-out bg-[#5BC0BE] rounded-full top-[8rem] absolute z-[10] -right-3 ${
          open && "rotate-180"
        }`}
      >
        <AiOutlineRight />
      </div>

      <div className={`mt-[100px] text-white  `}>
        <Link href={"/user"}>
          <a
            className={`flex items-center mb-5 rounded-md cursor-pointer gap-x-4 gap-y-4 hover:bg-white hover:text-black ${
              current === "/user" && "bg-white text-black"
            }`}
          >
            <div className={`cursor-pointer duration-500 p-1`}>
              <MdOutlineDashboard size={30} />
            </div>
            <h1
              className={` origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Dashboard
            </h1>
          </a>
        </Link>
        {/* second */}
        <div
          className={`flex items-center mb-5 rounded-md cursor-pointer gap-x-4 gap-y-4 hover:bg-white hover:text-black ${
            current === "/payment" && "bg-white text-black"
          }`}
        >
          <div className={`cursor-pointer duration-500 p-1`}>
            <RiSecurePaymentFill size={30} />
          </div>
          <h1
            className={` origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Payment
          </h1>
        </div>
        {/* third */}
        <Link href={"/music"}>
          <a
            className={`flex items-center mb-5 rounded-md cursor-pointer gap-x-4 gap-y-4 hover:bg-white hover:text-black ${
              current === "/music" && "bg-white text-black"
            }`}
          >
            <div className={`cursor-pointer duration-500 p-1`}>
              <FaMusic size={30} />
            </div>
            <h1
              className={` origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Music
            </h1>
          </a>
        </Link>
        {/* Game */}
        <Link href={"/games"}>
          <a
            className={`flex items-center mb-5 rounded-md cursor-pointer gap-x-4 gap-y-4 hover:bg-white hover:text-black ${
              current === "/games" && "bg-white text-black"
            }`}
          >
            <div className={`cursor-pointer duration-500 p-1`}>
              <IoGameControllerOutline size={30} />
            </div>
            <h1
              className={` origin-left font-medium text-xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Games
            </h1>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;
