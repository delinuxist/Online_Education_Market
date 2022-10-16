import Image from "next/image";
import bg from "../../public/assets/img/milad-fakurian-FTrDy_oxjmA-unsplash.jpg";
import React from "react";

const Header = ({ heading }) => {
  return (
    <div className={`relative min-w-screen h-32`}>
      <Image src={bg} alt="bg" priority layout="fill" />
      <div className="absolute top-0 w-full h-full bg-black/50" />
      <div
        className={`absolute flex items-center justify-center w-full h-full text-white text-3xl md:text-6xl font-bold
        `}
      >
        <h1>{heading}</h1>
      </div>
    </div>
  );
};

export default Header;
