import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineQuestionCircle } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import ReactMarkdown from "react-markdown";
import AddLessonsForm from "../../../../components/forms/AddLessonsForm";
import { BiAddToQueue } from "react-icons/bi";
import LessonList from "../../../../components/Lesson/LessonList";
import EditLesson from "../../../../components/Lesson/EditLesson";
import WithInstructorSidebar from "../../../../components/hoc/withInstructorSidebar";
import { Context } from "../../../../context";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { CURRENT } from "../../../../context/types";
const Course = () => {
  const [course, setCourse] = useState({});
  const [lessons, setLessons] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [EditModal, setOpenEditModal] = useState(false);
  const [uploading, setUpLoading] = useState(false);
  const [uploadName, setUploadName] = useState("Upload Video");
  const [preview, setPreview] = useState("");
  const [progress, setProgess] = useState(0);
  const [instructorId, setInstructorId] = useState("");
  const {
    state: { currentLesson },
    dispatch,
  } = useContext(Context);

  const [values, setValues] = useState({
    title: "",
    content: "",
    numberOfQuestions: "",
    video: {},
  });
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

  useEffect(() => {
    if (course) {
      enrolled();
    }
  }, [course]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openEditModal = () => {
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setOpenEditModal(false);
    dispatch({
      type: CURRENT,
      payload: null,
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const loadCourse = async () => {
    try {
      const {
        data: { course },
      } = await axios.get(`/server/course/${slug}`);
      {
        course && setInstructorId(course?.instructor._id);
        setCourse(course);
        setLessons(course?.lessons);
      }
    } catch (err) {
      toast("error");
    }
  };

  // get enrolled users for a course
  const enrolled = async () => {
    try {
      const { data } = await axios.post(`/server/enrolled-students`, {
        courseId: course._id,
      });

      // console.log(data);

      setEnrolledStudents(data.enrolledStudents.length);
    } catch (err) {
      console.log(err);
      toast("error in enrolled students");
    }
  };

  // Functions for add lessons
  const handleLesson = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const instructorId = course?.instructor._id;
      const {
        data: { updatedCourse },
      } = await axios.post(
        `/server/course/lesson/${slug}/${instructorId}`,
        values
      );
      setValues({
        ...values,
        title: "",
        content: "",
        numberOfQuestions: "",
        video: {},
      });
      closeModal();
      setPreview("");
      setProgess(0);
      setUploadName("Upload Video");
      setCourse(updatedCourse);
      loadCourse();
      toast.success("Lesson Added...");
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const handleVideo = async (e) => {
    try {
      const instructorId = course?.instructor._id;
      const video = e.target.files[0];
      setPreview(window.URL.createObjectURL(video));
      setUploadName(video.name);
      setUpLoading(true);
      const videoData = new FormData();
      videoData.append("video", video);
      // get progress of saving video
      const { data } = await axios.post(
        `/server/course/upload-video/${instructorId}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgess(parseInt(Math.round((100 * e.loaded) / e.total)));
          },
        }
      );
      // setValues({ ...values, video: data });
      console.log(data);
      setValues({ ...values, video: data });
      setUpLoading(false);
      toast.success("Video Uploaded....");
    } catch (err) {
      toast(err.response.data.msg);
      toast("video upload error");
      setUpLoading(false);
    }
  };

  const removeVideo = async () => {
    try {
      const instructorId = course?.instructor._id;
      const video = values.video;
      const res = await axios.post(
        `/server/course/remove-video/${instructorId}`,
        {
          video,
        }
      );

      setPreview("");
      setUploadName("Upload Video");
      setProgess(0);
      setValues({ ...values, video: {} });
    } catch (err) {
      toast("removing video failed");
    }
  };

  // Publishing course
  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you publish your course will be live on the market"
      );

      if (!answer) return;

      const { data } = await axios.put(`/server/course/publish/${courseId}`);
      setCourse(data.updated);
      toast.success("Hooray Course is now Live");
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Course will not be available for users to enroll"
      );

      if (!answer) return;
      const { data } = await axios.put(`/server/course/unpublish/${courseId}`);
      setCourse(data.updated);
      toast.success("Course unpublised");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    // <InstructorRoute>
    <div className="w-full h-screen  pt-[5rem]">
      {course && (
        <div className="w-full h-[18rem] relative">
          <div className="absolute w-full h-full bg-black/70" />
          <img
            className="object-center w-full h-full"
            src={course.image?.Location}
            alt="course"
          />
          <div className="absolute text-white top-[4rem] left-[2rem] space-y-3">
            <h1 className="text-6xl font-bold">{course.name}</h1>
            <p className="text-xl font-bold">{`Created by: ${course.instructor?.name}`}</p>
            <div className="pt-2">
              <p className="border  w-[8rem]  justify-items-center rounded-full text-[0.7rem] bg-blue-400 text-white font-light text-center">
                {course?.category}
              </p>
            </div>

            <p>
              <span>Lessons :</span> {course.lessons?.length}
            </p>
            <p>{`Students Enrolled: ${enrolledStudents}`}</p>
          </div>
          <div className="flex justify-between w-[10rem] h-10 absolute text-white top-[13rem] right-[2rem]">
            <Link href={`/instructor/course/edit/${slug}`} passHref>
              <button className="px-5 text-yellow-500 border-yellow-500 rounded-lg hover:border">
                <AiOutlineEdit size={30} />
              </button>
            </Link>
            <button className="px-5 text-green-500 border-green-500 rounded-lg hover:border">
              {course.lessons && course.lessons.length < 5 ? (
                <AiOutlineQuestionCircle
                  title="Min 5 lessons required to publish"
                  color="red"
                  size={30}
                />
              ) : course.published ? (
                <MdOutlineUnpublished
                  onClick={(e) => handleUnpublish(e, course._id)}
                  title="Unpublished"
                  size={30}
                />
              ) : (
                <MdPublishedWithChanges
                  onClick={(e) => handlePublish(e, course._id)}
                  title="Publish"
                  size={30}
                />
              )}
            </button>
          </div>
          <div className="px-6">
            <div className="px-2 py-3 ">
              <h1 className="pb-2 text-2xl font-bold ">Description</h1>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div className="flex justify-center py-8 ">
              <button
                type="button"
                onClick={openModal}
                className="px-8 py-2 rounded-lg bg-[#5BC0BE] hover:text-white hover:scale-105 duration-300 focus:outline-none flex items-center"
              >
                <BiAddToQueue className="mr-2" size={20} /> <h1>Add Lessons</h1>
              </button>
            </div>
            <div className="w-full h-full p-2 ">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{`${course.lessons?.length} Lessons`}</h1>
                <div
                  onClick={openEditModal}
                  className="px-4 py-2 mr-3 duration-300 bg-yellow-400 rounded-lg cursor-pointer hover:scale-105 hover:text-white"
                >
                  Edit Lessons
                </div>
              </div>

              <div className="grid grid-flow-row ">
                {course.lessons?.map((lesson, index) => (
                  <LessonList
                    key={index}
                    loadCourse={loadCourse}
                    lesson={lesson}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div>
              {/* Add Lesson Modal */}
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className={`relative z-[150]`}
                  onClose={closeModal}
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
                    <div className="flex items-center justify-center min-h-full p-4 ">
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
                          className={` transform w-[50rem] overflow-hidden shadow-xl bg-white transition-all p-6 rounded-2xl`}
                        >
                          <h1 className="pb-4 text-2xl font-bold text-center">
                            Add Lessons
                          </h1>
                          <AddLessonsForm
                            values={values}
                            handleLesson={handleLesson}
                            handleSubmit={handleSubmit}
                            uploading={uploading}
                            closeModal={closeModal}
                            handleVideo={handleVideo}
                            preview={preview}
                            uploadName={uploadName}
                            removeVideo={removeVideo}
                            progress={progress}
                          />
                        </Dialog.Panel>
                      </Transition>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              {/* Edit lesson Modal */}
              <Transition appear show={EditModal} as={Fragment}>
                <Dialog
                  as="div"
                  className={`relative z-[150]`}
                  onClose={closeEditModal}
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
                          className={`h-full transform w-[50rem] ${
                            currentLesson && "w-[75rem]"
                          } overflow-hidden shadow-xl bg-white transition-all duration-200 p-6 rounded-2xl`}
                        >
                          <h1 className="pb-4 text-2xl font-bold">
                            Edit Lessons
                          </h1>
                          <EditLesson
                            lessons={lessons}
                            setLessons={setLessons}
                            slug={slug}
                            // removeLesson={removeLesson}
                            loadCourse={loadCourse}
                            instructorId={instructorId}
                          />
                        </Dialog.Panel>
                      </Transition>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          </div>
        </div>
      )}
    </div>
    // </InstructorRoute>
  );
};

export default WithInstructorSidebar(Course);
