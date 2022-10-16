import Image from "next/image";
import Link from "next/link";
import React from "react";
import { currencyFormatter } from "../utils/helpers";

const CourseCard = ({ course }) => {
  return (
    <Link href={`/course/${course.slug}`}>
      <a className="w-full h-[25rem] rounded-lg shadow-lg hover:scale-105 duration-300 ">
        <div className=" w-full h-[12rem] relative ">
          <Image
            className="duration-300 rounded-t-lg hover:scale-105 "
            src={course.image.Location}
            alt={course.name}
            layout="fill"
          />
        </div>
        <div className="w-full pt-5">
          <h1 className="px-2 pt-4 text-3xl font-bold truncate">
            {course?.name}
          </h1>
          <h1 className="px-2 pt-2 font-normal text-gray-400 ">
            by {course?.instructor?.name}
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
              <div className=" text-3xl font-bold text-[#5BC0BE] ">Free</div>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CourseCard;
