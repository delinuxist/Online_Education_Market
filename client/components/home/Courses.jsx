import axios from "axios";
import React, { useEffect, useState } from "react";
import PublishedCourses from "./published/PublishedCourses";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Row from "./Row";
import UpComingCourses from "./upcoming/UpcomingCourses";

const Courses = ({ courses, upcoming }) => {
  // const [courses, setCourse] = useState([]);
  // useEffect(() => {
  //   loadPublishedCourses();
  // }, []);

  // const loadPublishedCourses = async () => {
  //   const { data } = await axios.get("/api/course/published-courses");
  //   {
  //     data.courses && setCourse(data.courses);
  //   }
  // };

  return (
    <div id="courses" className="w-full h-screen pt-[5rem]">
      <div className="w-full h-full ">
        <h1 className="text-3xl font-bold text-center ">Courses On Platform</h1>
        <div className="grid w-full h-full grid-rows-2">
          <Row
            Category={PublishedCourses}
            title="Available Courses"
            rowId={1}
            courses={courses}
          />
          <Row
            title="UpComing Courses"
            rowId={2}
            courses={upcoming}
            Category={UpComingCourses}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;
