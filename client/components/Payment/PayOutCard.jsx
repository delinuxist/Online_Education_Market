import Image from "next/image";
import React from "react";

const PayOutCard = ({ img }) => {
  return (
    <div className="h-32 px-4 duration-300 bg-white rounded-lg shadow-xl w-72 hover:scale-110 shadow-gray-400">
      <div className="flex items-center w-full h-full ">
        <Image src={img} alt="flutter" />
      </div>
    </div>
  );
};

export default PayOutCard;
