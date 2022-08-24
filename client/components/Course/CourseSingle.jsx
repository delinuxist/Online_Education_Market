import { SyncOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";
import ReactPlayer from "react-player";
import coursebg from "../../public/assets/img/aaron-boris-VxbMTmtRG5Q-unsplash.jpg";
import { currencyFormatter } from "../utils/helpers";
import { AiOutlineSafety } from "react-icons/ai";

const CourseSingle = ({
  course,
  setPreview,
  openPreviewModal,
  setModalName,
  paidCourse,
  freeCourse,
  user,
  loading,
  enrolled,
  setEnrolled,
  login,
}) => {
  return (
    <div className="relative w-full h-96">
      <Image
        src={coursebg}
        priority
        alt="coursebg"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute w-full h-full bg-black/70" />
      <div className="absolute grid w-full h-full grid-cols-3 text-white">
        <div className="col-span-2 ">
          <div className="pl-8 pt-14">
            <h1 className="text-6xl font-bold ">{course.name}</h1>
            <p className="pt-4 font-light">
              {course.description.substring(0, 210)}...
            </p>
            <div className="pt-4">
              <p className="border w-[8rem]  justify-items-center rounded-full  text-[0.7rem] bg-blue-400 text-white font-light text-center">
                {course.category}
              </p>
            </div>
            <p className="pt-4 font-light">
              Created by: {course.instructor.name}
            </p>

            <p className="pt-4 font-light">
              Last Updated: {new Date(course.updatedAt).toLocaleString()}
            </p>
            <h1 className="pt-4 text-4xl font-bold text-[#5BC0BE] ">
              {course.paid
                ? currencyFormatter({ amount: course.price, currency: "ghs" })
                : "Free"}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-full px-3 text-white duration-300 ">
          <div className="w-full">
            <div className="relative w-full duration-300 border-4 rounded-lg shadow-lg h-60 hover:shadow-gray-400">
              {course.lessons[0].video && course.lessons[0].video.Location ? (
                <div
                  onClick={() => {
                    setPreview(course.lessons[0].video.Location);
                    setModalName("Course Preview");
                    openPreviewModal();
                  }}
                  className="rounded-lg"
                >
                  <ReactPlayer
                    url={course.lessons[0].video.Location}
                    light={course.image.Location}
                    width="100%"
                    height="231.5px"
                    playing={false}
                  />
                </div>
              ) : (
                <div className="w-full h-full">
                  <Image
                    className="w-full duration-150 rounded-lg hover:scale-105 "
                    priority
                    src={course.image.Location}
                    alt="courseImage"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center pt-8 pb- ">
              {loading ? (
                <div>
                  <SyncOutlined className="p-2 text-xl text-pink-500 " spin />
                </div>
              ) : (
                <div
                  onClick={
                    user ? (course.paid ? paidCourse : freeCourse) : login
                  }
                  className="px-24 py-2 text-xl font-bold duration-200 bg-pink-500 rounded-full cursor-pointer hover:scale-105"
                >
                  <div className="flex items-center ">
                    <AiOutlineSafety className="mr-2" />
                    {user
                      ? enrolled.status
                        ? "Go to course"
                        : "Enroll"
                      : "Login To Enroll"}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSingle;
