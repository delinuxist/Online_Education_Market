import React, { useContext, useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoCreateOutline } from "react-icons/io5";
import Link from "next/link";

const InstructorSidebar = () => {
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
        <div
          className={`flex items-center mb-6 rounded-md cursor-pointer gap-x-4 gap-y-4 hover:bg-white hover:text-black ${
            current === "/instructor" && "bg-white text-black"
          }`}
        >
          <Link href="/instructor" passHref>
            <div className={`cursor-pointer duration-500 p-1`}>
              <MdOutlineDashboard size={30} />
            </div>
          </Link>
          <Link href="/instructor" passHref>
            <h1 className={` origin-left duration-300 ${!open && "scale-0"}`}>
              Dashboard
            </h1>
          </Link>
        </div>
        {/* second */}
        <div
          className={`flex items-center mb-1 rounded-md cursor-pointer gap-x-4 hover:bg-white hover:text-black ${
            current === "/instructor/course/create" && "bg-white text-black"
          }`}
        >
          <Link href="/instructor/course/create" passHref>
            <div className={`cursor-pointer duration-500 p-1`}>
              <IoCreateOutline size={30} />
            </div>
          </Link>
          <Link href="/instructor/course/create" passHref>
            <h1
              className={` origin-left duration-300 h-10 flex items-center ${
                !open && "scale-0 truncate"
              }`}
            >
              Create Course
            </h1>
          </Link>
        </div>
        {/* third */}
      </div>
    </div>
  );
};

export default InstructorSidebar;
