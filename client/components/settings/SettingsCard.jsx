import Link from "next/link";
import React from "react";

const SettingsCard = ({ Icon, title, link }) => {
  return (
    <Link href={link}>
      <a className="flex justify-center ">
        <div className=" h-[8rem] w-[20rem] shadow-lg bg-white rounded-md hover:scale-110 duration-300 hover:ring-1 ring-slate-500 flex justify-center items-center">
          <Icon size={30} className="mr-3" />
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
      </a>
    </Link>
  );
};

export default SettingsCard;
