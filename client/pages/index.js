import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import Link from "next/link";
import Hero from "../components/home/Hero";
import Courses from "../components/home/Courses";
import About from "../components/home/About";
import Footer from "../components/home/Footer";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home({ courses, upcoming }) {
  const {
    state: { user },
  } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/home");
    }
  }, [router, user]);

  return (
    <>
      <Hero />
      <Courses courses={courses} upcoming={upcoming} />
      <About />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.API}/course/published-courses`
  );
  const res = await axios.get(`${process.env.API}/course/upcoming-courses`);

  // console.log(res.data.courses);

  return {
    props: {
      courses: data.courses,
      upcoming: res.data.courses,
    },
  };
}
