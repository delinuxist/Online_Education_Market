import Image from "next/image";
import React from "react";
import Link from "next/link";
import { currencyFormatter } from "../../utils/helpers";

const UpComingCourses = ({ course }) => {
  return (
    <Link href={`#`}>
      <a className=" w-[160px] h-full relative  sm:w-[240px] lg:w-[450px] inline-block  cursor-pointer p-2 px-10">
        <div className="w-full h-full rounded-lg shadow-xl">
          <div className="relative w-full h-36 ">
            <Image
              className="duration-300 rounded-t-lg hover:scale-105"
              priority
              src={course?.image?.Location}
              alt={"courseImage"}
              layout="fill"
            />
          </div>
          <div className="w-full ">
            <h1 className="px-2 pt-4 text-3xl font-bold truncate">
              {course?.name}
            </h1>
            <h1 className="px-2 pt-2 font-normal text-gray-400 ">
              Created by: {course?.instructor?.name}
            </h1>
            <div className="pt-2">
              <p className="border border-slate-400 w-[8rem]  justify-items-center rounded-full ml-2 text-[0.7rem] bg-blue-400 text-white font-light text-center">
                {course?.category}
              </p>
            </div>

            <div className="w-full px-2 pt-2 ">
              {course?.paid ? (
                <div className=" text-3xl font-bold text-[#5BC0BE] ">
                  {currencyFormatter({ amount: course.price, currency: "ghs" })}
                </div>
              ) : (
                <div className=" text-3xl font-bold text-[#5BC0BE] rounded-lg ">
                  Free
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default UpComingCourses;
