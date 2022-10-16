import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import CourseCard from "../../components/Course/CoursesCard";
import EnrolledCourseCard from "../../components/Course/EnrolledCourseCard";
import WithUserSidebar from "../../components/hoc/withUserSidebar";
import Header from "../../components/Layout/Header";

const UserIndex = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/server/user/user-courses`);
      setCourses(data.courses);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className=" w-full h-screen  pt-[5rem]">
      <Header heading={"Enrolled Courses"} />
      <div className="w-full">
        {loading ? (
          <SyncOutlined
            spin
            className="flex items-center justify-center h-full text-5xl font-bold text-cyan-400"
          />
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full py-48">
            <h1 className="mb-8 text-5xl font-bold ">
              {" "}
              No Courses... Enroll in a course now!!!
            </h1>
            <Link href="/home">
              <a className="py-3 px-4 text-white font-semibold hover:scale-105 duration-200 text-3xl ease-in-out bg-[#5BC0BE] shadow-lg rounded-md">
                Courses
              </a>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 px-10 pt-5 ">
            {courses.map((course, index) => (
              <EnrolledCourseCard
                index={index}
                setCourses={setCourses}
                courses={courses}
                key={index}
                course={course}
              />
            ))}
          </div>
        )}
        {/* {courses.length > 0 && (
          <div className="grid gap-5 px-10 pt-5 ">
            {courses.map((course, index) => (
              <EnrolledCourseCard
                index={index}
                setCourses={setCourses}
                courses={courses}
                key={index}
                course={course}
              />
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default WithUserSidebar(UserIndex);
