import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ReactTyped from "react-typed";
import CourseCard from "../components/Course/CoursesCard";
import { Context } from "../context";
import { COURSES } from "../context/types";
import homeImg from "../public/assets/img/shubham-dhage-5LQ_h5cXB6U-unsplash.jpg";

const Home = ({ coursesList }) => {
  const router = useRouter();
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  const {
    state: { user, courses },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(courses?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(courses?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, courses]);

  // const [courses, setCourses] = useState([]);
  const [change, setChange] = useState(true);

  useEffect(() => {
    if (user?.role?.includes("Instructor")) {
      router.push("/instructor");
    }
  }, [router, user]);

  useEffect(() => {
    dispatch({
      type: COURSES,
      payload: coursesList,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChange(!change);
    }, 100000);
    return () => clearInterval(interval);
  }, [change]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % courses?.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="pt-[5rem]">
      <div className="relative w-full h-40 ">
        <Image
          className="w-full h-full "
          src={homeImg}
          alt="homeImg"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-0 w-full h-full text-white">
          <div className="px-16 pt-6 transition-all">
            {change ? (
              <h1 className="text-5xl font-bold ">
                <ReactTyped
                  strings={[`Welcome ${user?.name}`]}
                  typeSpeed={120}
                />
              </h1>
            ) : (
              <h1 className="text-5xl font-bold">Explore Our Courses...</h1>
            )}
            <h1 className="pt-5 text-4xl font-bold">
              <span className="text-transparent bg-gradient-to-tr from-teal-500 to-slate-500 bg-clip-text">
                Shape
              </span>{" "}
              Your{" "}
              <span className="text-transparent bg-gradient-to-br from-teal-500 to-slate-500 bg-clip-text">
                Career
              </span>{" "}
              Today{" "}
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full h-full ">
        <div className="grid grid-cols-4 gap-5 px-5 pt-5 ">
          {currentItems?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={4}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center items-center mt-[3.5rem] mb-[3rem] gap-[9px]"
          pageLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-md hover:bg-teal-500 hover:text-white"
          previousLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-md hover:bg-teal-500 hover:text-white"
          previousClassName="py-[8px] px-[15px] cursor-pointer rounded-md hover:bg-teal-500 hover:text-white border border-1 border-teal-500"
          nextLinkClassName="py-[8px] px-[15px] cursor-pointer rounded-md hover:bg-teal-500 hover:text-white"
          nextClassName="py-[8px] px-[15px] cursor-pointer rounded-md hover:bg-teal-500 hover:text-white border border-1 border-teal-500"
          activeClassName="bg-teal-500 rounded-md text-white py-[8px] px-[5px]  "
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.API}/course/published-courses`
  );

  return {
    props: {
      coursesList: data.courses,
    },
  };
}

export default Home;
