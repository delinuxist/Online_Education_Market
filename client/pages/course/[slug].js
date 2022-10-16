import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import CourseSingle from "../../components/Course/CourseSingle";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CoursePreviewModal from "../../components/Course/CoursePreviewModal";
import SingleCourseList from "../../components/Course/SingleCourseList";
import { useContext } from "react";
import { Context } from "../../context";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SingleCourse({ course }) {
  const [previewModal, setPreviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [modalName, setModalName] = useState("");
  const [enrolled, setEnrolled] = useState({});
  const router = useRouter();
  const { slug } = router.query;

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user && course) {
      checkEnrollment();
    }
  }, [user, course]);

  const checkEnrollment = async () => {
    try {
      const { data } = await axios.get(
        `/server/course/check-enroll/${course._id}`
      );
      setEnrolled(data);
    } catch (err) {
      toast.error("Failed");
    }
  };

  const openPreviewModal = () => {
    setPreviewModal(true);
  };

  const closePreviewModal = () => {
    setPreviewModal(false);
  };

  const paidCourse = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");

      // check if user already enrolled
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`);
      }

      const { data } = await axios.get(`/server/payment/make_Payment/${slug}`);

      if (data.status === "success") {
        return router.push(data.data.link);
      }

      setLoading(false);
      // toast.success(data.message);
      // router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      setLoading(false);
      console.log("Enroll failded ");
    }
  };

  const freeCourse = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");

      // check if user already enrolled
      if (enrolled.status) {
        return router.push(`/user/course/${enrolled.course.slug}`);
      }

      const { data } = await axios.post(
        `/server/course/free-enroll/${course._id}`
      );

      setLoading(false);
      toast.success(data.message);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      setLoading(false);
      console.log("Enroll failded ");
    }
  };

  const login = () => {
    router.push("/login");
  };

  return (
    <div className="pt-[5rem] w-full h-screen">
      <CourseSingle
        course={course}
        previewModal={previewModal}
        setPreviewModal={setPreviewModal}
        preview={preview}
        setPreview={setPreview}
        openPreviewModal={openPreviewModal}
        closePreviewModal={closePreviewModal}
        setModalName={setModalName}
        paidCourse={paidCourse}
        freeCourse={freeCourse}
        user={user}
        loading={loading}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
        login={login}
      />
      <div className="w-full px-10 py-5">
        <h1 className="pb-2 text-3xl font-bold border-b">{`${course.lessons?.length} Lessons`}</h1>
        {course.lessons &&
          course.lessons.map((lesson, index) => (
            <SingleCourseList
              setModalName={setModalName}
              key={index}
              index={index}
              lesson={lesson}
              setPreview={setPreview}
              openPreviewModal={openPreviewModal}
            />
          ))}
      </div>
      {/* Preview Modal */}
      <Transition appear show={previewModal} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-[150]`}
          onClose={closePreviewModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex items-center justify-center min-h-full p-4 text-center ">
              <Transition
                as={Fragment}
                enter="ease out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={` transform w-[40rem] h-[26.3rem] overflow-hidden shadow-xl bg-white transition-all  rounded-2xl`}
                >
                  <CoursePreviewModal
                    preview={preview}
                    modalName={modalName}
                    closePreviewModal={closePreviewModal}
                    previewModal={previewModal}
                  />
                </Dialog.Panel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  // let abortController;

  // abortController = new AbortController();
  // let signal = abortController.signal;

  const { data } = await axios.get(
    `${process.env.API}/course/single-course/${slug}`
    // { signal: signal }
  );

  // abortController.abort();

  return {
    props: {
      course: data.course,
    },
  };
}
