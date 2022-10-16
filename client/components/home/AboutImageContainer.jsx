import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutImageContainer = ({
  group,
  link,
  content,
  image,
  bgColor,
  textColor,
}) => {
  return (
    <div className="flex justify-center">
      <div className="relative h-[20rem] shadow-lg">
        <Image
          src={image}
          height="320px"
          width="450px"
          alt="Instructor"
          className="h-full rounded-md "
        />
        <div className="absolute top-0 w-full h-full rounded-md bg-black/30"></div>
        <div className="absolute top-[35%] left-[35%]">
          <h1 className="z-10 py-4 text-2xl font-bold text-white rounded-md ">
            {group}
          </h1>
          <Link href={link}>
            <a
              className={`px-3 py-2 text-white border border-white rounded-full hover:${bgColor} hover:${textColor}`}
            >
              {content}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutImageContainer;
