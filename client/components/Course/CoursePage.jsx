import Image from "next/image";
import React from "react";

const CoursePage = ({ course }) => {
  return (
    <div className="w-full h-[15rem]">
      <Image
        src={course.image.Location}
        alt="course"
        width={100}
        height={100}
      />
    </div>
  );
};

export default CoursePage;
