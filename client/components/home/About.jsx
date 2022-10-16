import Image from "next/image";
import React from "react";
import Link from "next/link";
import postPng from "../../public/assets/img/—Pngtree—modern flat design concept of_5332889.png";
import learnPng from "../../public/assets/img/—Pngtree—online course learning progress vector_5752823.png";
import Instructor from "../../public/assets/img/instructor.png";
import Student from "../../public/assets/img/students.png";
import AboutImageContainer from "./AboutImageContainer";
import ToolsForTeachers from "../../public/assets/img/toolsforTeachers.png";
import Assessments from "../../public/assets/img/assessments.png";

const About = () => {
  return (
    <div id="about" className="w-full min-h-screen   pt-[8rem]">
      <header className="h-[5rem] flex items-center justify-center ">
        <h1 className="text-3xl font-bold ">
          {" "}
          What is{" "}
          <span className="text-transparent bg-gradient-to-tr from-[#5BC0BE] to-purple-800 bg-clip-text">
            J-Learn?
          </span>
        </h1>
      </header>
      <div className="py-5 px-18">
        <p className="px-24 font-light text-center text-black ">
          JUST-LEARN is an online education market place where one can become an
          instructor and upload a lesson. The goal of this project is to support
          the functions of teaching and learning by enabling the creation and
          preservation of educational resources, making them accessible, simple
          to access and sharing by students and anyone else. JUST-LEARN is an
          e-learning market place where learning methods that acknowledges that
          the instructor and the student may be located anywhere. It also gives
          the instructor the chance to edit his/her lesson, to upload video and
          gives description about the lesson. The instructor can choose whether
          to make a lesson free or a student will pay for the lesson. Students
          can access this by the use of smartphones, laptops and tablets. The
          student can take test after every lesson they watch. With a variety of
          learning resources and tools to support anyone in learning more
          deeply, more effectively, and affordably throughout the course of
          their career, JUST-LEARN is one of several educational firms.
        </p>
      </div>
      <div className="grid grid-cols-2 px-16 py-8">
        <AboutImageContainer
          group={"For Instructors"}
          image={Instructor}
          link="/login"
          content={"Create a course today"}
          bgColor="bg-white"
          textColor="text-black"
        />

        <AboutImageContainer
          group={"For Students"}
          image={Student}
          link="#courses"
          content={"Take a course today"}
          bgColor={"bg-[#5BC0BE]"}
          textColor="text-white"
        />
      </div>
      {/* Tools */}
      <div className="flex items-center justify-between px-48 py-16">
        <div className="w-[18rem]">
          <h1 className="py-2 text-3xl font-semibold ">
            <span className="text-transparent bg-gradient-to-tr from-[#5BC0BE] to-purple-800 bg-clip-text">
              Tools
            </span>{" "}
            For Teachers And Learners
          </h1>
          <p className="font-light tracking-wider text-gray-500">
            Class has a dynamic set of teaching tools build to be deployed and
            used during class.Instructors can add tests for every lesson
            uploaded.
          </p>
        </div>
        <div>
          <Image
            src={ToolsForTeachers}
            height="320px"
            width="450px"
            alt="tools"
            className="h-full rounded-md "
          />
        </div>
      </div>

      {/* Assesments */}
      <div className="flex items-center justify-between px-48 py-16">
        <div>
          <Image
            src={Assessments}
            height="500px"
            width="450px"
            alt="tools"
            className="h-full rounded-md "
          />
        </div>
        <div className="w-[18rem]">
          <h1 className="w-[20rem] py-2 text-3xl font-semibold ">
            Real Time Scores After{" "}
            <span className="text-transparent bg-gradient-to-tr from-[#5BC0BE] to-purple-800 bg-clip-text">
              Tests
            </span>
          </h1>
          <p className="font-light tracking-wider text-gray-500">
            Easily start tests after taking each lesson. Student results are
            automatically scored and diplayed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

{
  /* <Image
className="duration-500 drop-shadow-lg hover:scale-105"
src={aboutImg}
alt="aboutImg"
height={600}
width={600}
/> */
}

{
  /* <div className="w-full h-full ">
<div className="grid w-full h-full grid-cols-2 ">
  <div className="">
    <div className="flex items-center justify-center w-full h-full ">
      <Image
        className="duration-700 bg-transparent hover:-scale-x-100 drop-shadow-lg"
        src={learnPng}
        alt="heroImg"
        height={600}
        width={600}
      />
    </div>
  </div>
  <div className="w-full h-full px-12 py-24 ">
    <h1 className="px-5 py-8 text-5xl font-bold text-transparent bg-gradient-to-tr from-[#5BC0BE] to-purple-800 bg-clip-text">
      About Us
    </h1>
    <p className="px-5 py-4 mb-10 tracking-wider ">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Asperiores perspiciatis, enim aut amet quos soluta recusandae,
      sint totam sed pariatur a porro iste et? Sit, itaque numquam velit
      beatae porro, nobis sapiente eveniet quaerat debitis officiis vel
      incidunt delectus nostrum quae? Unde culpa assumenda earum
      voluptatum asperiores provident explicabo ab, aliquam veritatis
      error ut eos deserunt commodi deleniti quaerat illo.
    </p>
    <Link href="/login" passHref>
      <div className="bg-gradient-to-tr from-[#5BC0BE] to-purple-800 text-white text-2xl font-bold py-2 text-center rounded-lg hover:scale-105 duration-300 cursor-pointer">
        Start Your Journey Today
      </div>
    </Link>
  </div>
</div>
</div> */
}
