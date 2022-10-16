import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseList from "../../components/Course/CourseList";
import WithInstructorSidebar from "../../components/hoc/withInstructorSidebar";
import Header from "../../components/Layout/Header";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const {
        data: { courses, count },
      } = await axios.get("/server/instructor-courses");
      setCourses(courses);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.msg);
    }
  };
  return (
    // <InstructorRoute>
    <div className="w-full h-screen pt-[5rem]">
      <Header heading={"Courses"} />
      <div className="flex justify-center w-full h-full">
        <div className="w-[50rem] h-full mt-10">
          {loading ? (
            <SyncOutlined
              spin
              className="flex items-center justify-center h-full text-5xl font-bold text-cyan-400"
            />
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full ">
              <h1 className="mb-8 text-5xl font-bold ">
                {" "}
                No Courses Available...
              </h1>
              <Link href="/instructor/course/create">
                <a className="py-3 px-4 text-white font-semibold hover:scale-105 duration-200 ease-in-out bg-[#5BC0BE] shadow-lg rounded-md">
                  Create Course
                </a>
              </Link>
            </div>
          ) : (
            <div className="grid grid-flow-row ">
              {courses.map((course, index) => (
                <CourseList
                  key={course._id}
                  index={index}
                  setCourses={setCourses}
                  courses={courses}
                  course={course}
                  loadCourses={loadCourses}
                />
              ))}
            </div>
          )}
          {/* {courses.length > 0 && (
            <div className="grid grid-flow-row ">
              {courses.map((course, index) => (
                <CourseList
                  key={course._id}
                  index={index}
                  setCourses={setCourses}
                  courses={courses}
                  course={course}
                  loadCourses={loadCourses}
                />
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
    // </InstructorRoute>
  );
};

export default WithInstructorSidebar(InstructorIndex);
