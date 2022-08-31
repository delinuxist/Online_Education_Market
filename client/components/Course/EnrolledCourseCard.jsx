import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const EnrolledCourseCard = ({ course }) => {
  return (
    <Link href={`/user/course/${course.slug}`}>
      <a className="w-full duration-300 border rounded-md shadow-lg h-36 border-slate-300 hover:scale-105">
        <div className="flex items-center w-full h-full px-10">
          <div className="flex items-center w-full h-full">
            <div className="w-32 h-32 mr-4 rounded-lg shadow-2xl">
              <Image
                className="rounded-lg "
                src={course?.image.Location}
                alt="courseImage"
                width={400}
                height={400}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#5BC0BE]">
                {course.name}
              </h1>
              <p className="pt-2 text-xl font-light">{`${course?.lessons?.length} Lessons`}</p>
              <p className="pt-2 font-light text-gray-500">{`Created by: ${course.instructor.name}`}</p>
            </div>
          </div>
          <FaPlayCircle size={40} className=" text-[#5BC0BE]" />
        </div>
      </a>
    </Link>
  );
};

export default EnrolledCourseCard;
