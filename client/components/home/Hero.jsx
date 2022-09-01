import Image from "next/image";
import Link from "next/link";
import React from "react";
import Herobg from "../../public/assets/img/annie-spratt-QckxruozjRg-unsplash.jpg";
import Herobg1 from "../../public/assets/img/annie-spratt-xKJUnFwfz3s-unsplash.jpg";
import ReactTyped from "react-typed";
import { Carousel } from "flowbite-react";

const Hero = () => {
  const images = [Herobg, Herobg1];

  // const zoomProp = {
  //   indicators: true,
  //   scale: 1.2,
  //   duration: 5000,
  //   transitionDuration: 500,
  //   infinite: true,
  // };

  return (
    <div className="relative w-full h-screen ">
      <div className="relative w-full h-full ">
        {/* <Image
          className="w-full h-full "
          src={Herobg1}
          alt="Herobg"
          layout="fill"
        /> */}

        <Carousel
          slideInterval={6000}
          indicators={false}
          leftControl
          rightControl
        >
          <img
            src="https://res.cloudinary.com/delinuxist/image/upload/v1660826259/annie-spratt-QckxruozjRg-unsplash_fdkeky.jpg"
            alt="herobg"
          />
          {/* <img
            src="https://res.cloudinary.com/delinuxist/image/upload/v1660826224/annie-spratt-xKJUnFwfz3s-unsplash_qnjfwd.jpg"
            alt="..."
          /> */}
          <img
            src="https://res.cloudinary.com/delinuxist/image/upload/v1660848359/boy-6680407_1920_syj3s8.jpg"
            alt="..."
          />
          <img
            src="https://res.cloudinary.com/delinuxist/image/upload/v1660848364/kids-4928559_1920_e6ru0w.jpg"
            alt="..."
          />
        </Carousel>
        <div className="absolute top-0 w-full h-full bg-black/40" />
        <div className="absolute pt-[5rem] top-0 w-full h-full">
          <div className="px-24 py-28">
            <h1 className="font-bold text-8xl tracking-wide bg-gradient-to-r from-[#5BC0BE] to-slate-600 bg-clip-text text-transparent ">
              Just-Learn
            </h1>
            <h1 className="py-5 text-6xl font-bold tracking-widest text-white">
              Learn without limits.
            </h1>
            <p className="text-3xl tracking-wider text-white">
              “
              <span className="text-transparent bg-gradient-to-tr from-blue-400 to-slate-400 bg-clip-text">
                Learning{" "}
              </span>
              never exhausts the{" "}
              <span className="text-transparent bg-gradient-to-br from-blue-400 to-slate-400 bg-clip-text">
                mind
              </span>
              .”
            </p>
            <div className="text-white font-serif italic  w-[31rem] text-center py-5 text-3xl">
              <ReactTyped
                strings={["Determination", "Focus", "And Success!!!!"]}
                typeSpeed={120}
                backSpeed={140}
                loop
              />
            </div>
            <div className="py-5 text-2xl w-[35rem] items-center flex  text-white font-bold justify-between font-serif">
              <Link href="/#about" passHref>
                <div className=" bg-transparent border-[#5BC0BE]  py-2 px-2 w-[12rem]  mt-8 text-center rounded-lg  hover:border-2 duration-300 text-2xl cursor-pointer">
                  About Us
                </div>
              </Link>
              <Link href="/register" passHref>
                <div className=" bg-gradient-to-tr from-[#5BC0BE] to-slate-400  py-3 px-3 w-[18rem] mt-8 text-center rounded-lg hover:text-white hover:scale-105 duration-300 text-2xl cursor-pointer">
                  Join For Free Today
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

{
  /* <div className="grid w-full h-full grid-cols-2 ">
        <div className="justify-center w-full h-full px-12 py-[15rem] ">
          <h1 className="font-bold text-7xl bg-gradient-to-tr from-[#5BC0BE] to-slate-500 bg-clip-text text-transparent">
            Just Learn
          </h1>
          <h1>Learn without limits</h1>
          <p className="py-3 text-3xl font-bond">
            <ReactTyped
              strings={["Determination", "Focus", "Success"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </p>
          <Link href="/#about" passHref>
            <div className=" bg-[#5BC0BE] py-2 px-2 w-[12rem] mt-8 text-center rounded-lg hover:text-white hover:scale-105 duration-300 text-2xl cursor-pointer">
              About Us
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center w-full h-full ">
          <Image
            className="duration-700 bg-transparent hover:-scale-x-100 drop-shadow-lg"
            src={heroImg}
            alt="heroImg"
            height={600}
            width={600}
          />
        </div>
      </div> */
}

{
  /* <div id="carouselExampleSlidesOnly" className="relative carousel slide" data-bs-ride="carousel">
  <div className="relative w-full overflow-hidden carousel-inner">
    <div className="relative float-left w-full carousel-item active">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
        className="block w-full"
        alt="Wild Landscape"
      />
    </div>
    <div className="relative float-left w-full carousel-item">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
        className="block w-full"
        alt="Camera"
      />
    </div>
    <div className="relative float-left w-full carousel-item">
      <img
        src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
        className="block w-full"
        alt="Exotic Fruits"
      />
    </div>
  </div>
</div> */
}
