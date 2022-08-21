import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineUnpublished } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/outline";
import axios from "axios";
import ConfirmModal from "../Layout/ConfirmModal";
import { toast } from "react-toastify";

const CourseList = ({ course, index, setCourses, courses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteCourse = async () => {
    try {
      const myCourses = [...courses];
      myCourses.splice(index, 1);
      setCourses(myCourses);

      const { data } = await axios.delete(
        `/server/course/delete-course/${course._id}`
      );
      toast.success(`${data.deletedCourse.name} deleted...`);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-full mb-4 duration-300 ease-in-out hover:scale-105">
      <div className="w-full h-32 shadow-lg rounded-xl shadow-gray-400">
        <div className="flex items-center w-full h-full p-4">
          <div className="w-[6rem] h-[6rem] rounded-full shadow-2xl">
            <Image
              className="rounded-full "
              src={course.image.Location}
              alt="profile"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col ml-3 w-[40rem] ">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href={`/instructor/course/view/${encodeURIComponent(
                    course.slug
                  )}`}
                  passHref
                >
                  <h1 className="text-2xl font-bold text-[#5BC0BE] cursor-pointer">
                    {course.name}
                  </h1>
                </Link>
                <p className="">
                  <span className="font-bold ">Lessons : </span>{" "}
                  {course?.lessons.length}
                </p>
                <p
                  className={`font-normal ${
                    course?.lessons?.length
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {course?.lessons?.length < 5
                    ? "5 lessons required to publish a course"
                    : course.published
                    ? "Course is Available in Marketplace"
                    : "Course is ready to be published"}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between text-red-600 h-[5rem]">
                {course.published ? (
                  <IoCheckmarkDoneOutline
                    color="green"
                    title="Published"
                    size={30}
                  />
                ) : (
                  <MdOutlineUnpublished
                    title="Unpublished"
                    color="red"
                    size={30}
                  />
                )}
                <TrashIcon
                  onClick={() => setIsOpen(!isOpen)}
                  className="cursor-pointer w-7 h-7"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={isOpen}
        command={deleteCourse}
        setIsOpen={setIsOpen}
        title={"Delete Course"}
        message={"Are you sure you want to delete course"}
      />
    </div>
  );
};

export default CourseList;
