import Image from "next/image";
import React from "react";
import defaultImg from "../../public/assets/img/default.png";

const DiscussList = ({ discussion }) => {
  return (
    <div className="flex items-center w-full py-3 duration-150 bg-gray-100 rounded-md shadow-lg hover:scale-95">
      <div className=" relative cursor-pointer w-[55px] rounded-full h-[55px] ml-8 mr-5 bg-slate-400">
        <Image
          className="rounded-full"
          src={discussion?.image ? discussion.image : defaultImg}
          alt="commentImg"
          layout="fill"
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold"> {discussion?.name}</h1>
        <p className="w-full font-light text-gray-600">{discussion?.comment}</p>
      </div>
    </div>
  );
};

export default DiscussList;
