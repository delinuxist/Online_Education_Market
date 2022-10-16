import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../Layout/ConfirmModal";

const EnrolledCourseCard = ({ course, courses, index, setCourses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteCourse = async () => {
    try {
      const myCourses = [...courses];
      myCourses.splice(index, 1);
      setCourses(myCourses);

      const { data } = await axios.get(
        `/server/user/deleteCourse/${course._id}`
      );

      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full duration-300 border rounded-md shadow-lg h-36 border-slate-300 hover:scale-105">
      <div className="flex items-center w-full h-full px-10">
        <Link href={`/user/course/${course.slug}`}>
          <a className="flex items-center w-full h-full">
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
          </a>
        </Link>
        <MdDelete
          onClick={() => setIsOpen(!isOpen)}
          size={40}
          className="text-red-600 duration-300 hover:scale-105 z-index-[100] cursor-pointer"
        />
        <ConfirmModal
          isOpen={isOpen}
          command={deleteCourse}
          setIsOpen={setIsOpen}
          title={"Delete Course"}
          message={"Are you sure you want to delete course from list"}
        />
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
