import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
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
        {loading && (
          <SyncOutlined
            spin
            className="flex items-center justify-center h-full text-5xl font-bold text-cyan-400"
          />
        )}
        {courses && (
          <div className="grid gap-5 px-10 pt-5 ">
            {courses.map((course, index) => (
              <EnrolledCourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WithUserSidebar(UserIndex);
