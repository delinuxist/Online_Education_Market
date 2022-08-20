import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Row = ({ courses, title, Category, rowId }) => {
  const slideLeft = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="relative flex items-center group">
      {courses.length > 0 && (
        <MdChevronLeft
          onClick={slideLeft}
          size={40}
          className="absolute z-10 hidden text-black bg-white rounded-full opacity-50 cursor-pointer left-2 hover:opacity-100 group-hover:block hover:bg-gray-400"
        />
      )}
      <div className="flex flex-col w-full h-full">
        <h1 className="w-[20rem] rounded-r-full px-10 text-2xl font-serif text-white  shadow-lg bg-teal-600  ">
          {title}
        </h1>
        {courses.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <h1 className="font-serif text-6xl font-bold ">No Courses</h1>
          </div>
        )}
        {courses.length > 0 && (
          <div
            id={"slider" + rowId}
            className="relative w-screen h-full overflow-x-scroll overflow-y-hidden whitespace-nowrap scroll-smooth scrollbar-hide "
          >
            {courses.map((course, index) => (
              <Category key={index} course={course} />
            ))}
          </div>
        )}
      </div>
      {courses.length > 0 && (
        <MdChevronRight
          onClick={slideRight}
          size={40}
          className="absolute z-10 hidden text-black bg-white rounded-full opacity-50 cursor-pointer right-2 hover:bg-gray-400 hover:opacity-100 group-hover:block"
        />
      )}
    </div>
  );
};

export default Row;
