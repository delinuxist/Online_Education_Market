import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosDoneAll } from "react-icons/io";
import { BsDash } from "react-icons/bs";
import StudentRoute from "../../../components/routes/StudentRoute";
import ReactPlayer from "react-player";
import { SyncOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { Tab } from "@headlessui/react";
import Note from "../../../components/Course/Note";
import Discussion from "../../../components/Course/Discussion";

export default function CoursePage() {
  const [course, setCourse] = useState({});
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapse] = useState(false);
  const [question, setQuestions] = useState({});
  const [loading, setLoading] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [selectedCompletedTest, setselectedCompletedTest] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [note, setNote] = useState("");
  // force update State
  const [updateState, setUpdateState] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  // headless ui
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) {
      loadCompletedLessons();
      loadCompletedTests();
    }
  }, [course]);

  useEffect(() => {
    if (clicked != -1) {
      getQuestion();
      loadCompletedTests();
      // run when another lesson is clicked
      CompletedTest(course.lessons[clicked]._id);
      setSelectedIndex(0);
    }
  }, [clicked]);

  useEffect(() => {
    setNote(selectedCompletedTest?.note ? selectedCompletedTest?.note : "");
  }, [selectedCompletedTest]);

  console.log(selectedIndex);

  const getQuestion = async () => {
    try {
      const { data } = await axios.get(
        `/server/question/getQuestion/${course.lessons[clicked]._id}`
      );
      {
        data.status === "success" && setQuestions(data.question);
      }

      {
        data.status === "failed" && setQuestions(null);
      }

      // if (data.question.questions.length > 0) {
      //   setQuestionsCount(data.question.questions.length);
      // }
    } catch (err) {
      toast("Error");
    }
  };

  // load Completed tests
  const loadCompletedTests = async () => {
    try {
      const { data } = await axios.post(`/server/question/getCompletedTest`, {
        courseId: course._id,
      });

      setCompletedTests(data?.completedTests);

      // const list = data?.completedTests;
      // let ids = [];
      // for (let i = 0; i < list.length; i++) {
      //   ids.push(list[i].lessonId);
      // }
      // setCompletedTests(ids);
    } catch (err) {
      toast.error("Error");
    }
  };

  // set completed test
  const CompletedTest = (lessonId) => {
    let selected = {};

    for (let i = 0; i < completedTests.length; i++) {
      if (lessonId === completedTests[i].lessonId) {
        selected = completedTests[i];
      }
    }
    setselectedCompletedTest(selected);
    // setNote(selected?.note);
  };

  console.log(selectedCompletedTest);

  const loadCourse = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/server/user/single-course/${slug}`);

      {
        data.course && setCourse(data.course);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loadCompletedLessons = async () => {
    try {
      const { data } = await axios.post(`/server/user/completed-lessons`, {
        courseId: course._id,
      });

      {
        data && setCompletedLessons(data.completedLessons);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/server/user/markLesson-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const markIncomplete = async () => {
    const { data } = await axios.post(`/server/user/markLesson-incomplete`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });

    setCompletedLessons(data.update);
    setUpdateState(!updateState);

    // {
    //   data && data.updated && setCompletedLessons(data.updated);
    // }

    toast.success("Lesson set incompleted");
  };

  const handleAnswerOptionClick = async (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < question.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const { data } = await axios.post(
        `/server/question/completedTest/${course._id}/${course.lessons[clicked]._id}`,
        { score }
      );
      setRun(!run);

      if (data.success) {
        getQuestion();
        loadCompletedTests();
      }
    }
  };

  // view Result function
  const viewResult = async () => {
    setShowScore(!showScore);
  };

  // Retake Test function
  const retakeTest = async () => {
    const { data } = await axios.get(
      `/server/question/retakeTest/${course.lessons[clicked]._id}`
    );

    if (data.status === "success") {
      setCurrentQuestion(0);
      getQuestion();
      loadCompletedTests();
      CompletedTest(course.lessons[clicked]._id);
      setScore(0);
    }
  };

  // Save Note
  const saveNote = async () => {
    try {
      const { data } = await axios.post(
        `/server/question/saveNote/${course._id}/${course.lessons[clicked]._id}`,
        { note }
      );
      if (data?.success) {
        toast.success("Note Saved");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StudentRoute>
      <div className="h-screen">
        <div className="flex">
          {/* Sidebar */}
          <div
            className={`${
              !collapsed ? "w-[300px]" : "w-20"
            } relative  h-screen text-white   bg-[#25292A] duration-200 p-5 `}
          >
            <div className=" pt-[5rem]">
              <div
                onClick={() => setCollapse(!collapsed)}
                className={`flex items-center mb-6 rounded-md cursor-pointer gap-x-8 gap-y-4  hover:bg-white hover:text-black`}
              >
                <div className="duration-500 ">
                  {!collapsed ? (
                    <AiOutlineMenuFold className="cursor-pointer " size={35} />
                  ) : (
                    <AiOutlineMenuUnfold
                      className="cursor-pointer "
                      size={35}
                    />
                  )}
                </div>

                <h1
                  className={`origin-left duration-300 font-bold text-xl ${
                    collapsed && "scale-0"
                  }`}
                >
                  Lessons
                </h1>
              </div>

              {loading && (
                <div className="w-full text-center">
                  <SyncOutlined spin />
                </div>
              )}

              {course.lessons?.map((lesson, index) => (
                <div
                  key={index}
                  onClick={() => setClicked(index)}
                  className={`flex items-center  mb-6 rounded-md h-10 cursor-pointer gap-x-4 gap-y-4 hover:bg-white  hover:text-black ${
                    clicked === index && "bg-white text-black"
                  }`}
                >
                  <div className="h-full">
                    <h1 className="flex items-center justify-center w-10 h-full">
                      {index + 1}
                    </h1>
                  </div>

                  <div
                    className={`origin-left duration-300 font-light h-full w-full flex justify-between items-center truncate text-xl ${
                      collapsed && "scale-0"
                    }`}
                  >
                    <h1 className="truncate">{lesson.title}</h1>
                    {completedLessons.includes(lesson._id) ? (
                      <IoIosDoneAll color="green" />
                    ) : (
                      <BsDash color="red" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" pt-[5rem] h-screen w-full overflow-scroll scrollbar-hide">
            {clicked === -1 ? (
              <div className="flex items-center justify-center w-full h-full ">
                <h1 className="text-5xl font-bold ">
                  Click on Lessons to Get started
                </h1>
              </div>
            ) : (
              <div className="w-full h-full ">
                {/* <Header heading={course.lessons[clicked].title} lesson={true} /> */}

                {course.lessons[clicked].video &&
                  course.lessons[clicked].video.Location && (
                    <div className="w-full h-[30rem] relative group">
                      <ReactPlayer
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="100%"
                        controls
                        onEnded={markCompleted}
                      />
                      <div className="absolute top-0 hidden w-full h-14 bg-black/60 group-hover:block">
                        <div className="flex items-center justify-between w-full h-full px-3 ">
                          <h1 className="text-4xl font-semibold text-white">
                            {course.lessons[clicked].title}
                          </h1>
                          <div
                            onClick={
                              completedLessons.includes(
                                course.lessons[clicked]._id
                              )
                                ? markIncomplete
                                : markCompleted
                            }
                            className="px-3 py-2 text-white bg-[#5BC0BE] rounded-lg cursor-pointer hover:scale-105 duration-300"
                          >
                            {completedLessons.includes(
                              course.lessons[clicked]._id
                            )
                              ? "mark as incomplete"
                              : "mark as completed"}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                <div className="w-full px-2 py-8 ">
                  <Tab.Group selectedIndex={selectedIndex} manual>
                    <Tab.List className="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
                      <Tab
                        key={0}
                        className={({ selected }) =>
                          `w-full rounded-lg py-2.5 text-2xl font-medium leading-5
                 ${
                   selected
                     ? "bg-[#5BC0BE] text-white shadow"
                     : "text-black hover:bg-white/[0.12] hover:text-white"
                 }`
                        }
                      >
                        Description
                      </Tab>
                      <Tab
                        key={1}
                        className={({ selected }) =>
                          `w-full rounded-lg py-2.5 text-2xl font-medium leading-5
                 ${
                   selected
                     ? "bg-[#5BC0BE] text-white shadow"
                     : "text-black hover:bg-white/[0.12] hover:text-white"
                 }`
                        }
                      >
                        Discussions
                      </Tab>
                      <Tab
                        key={2}
                        className={({ selected }) =>
                          `w-full rounded-lg py-2.5 text-2xl font-medium leading-5
                 ${
                   selected
                     ? "bg-[#5BC0BE] text-white shadow"
                     : "text-black hover:bg-white/[0.12] hover:text-white"
                 }`
                        }
                      >
                        Note
                      </Tab>
                      <Tab
                        key={3}
                        disabled={
                          !completedLessons.includes(
                            course.lessons[clicked]._id
                          )
                        }
                        className={({ selected }) =>
                          `w-full rounded-lg py-2.5 text-2xl font-medium leading-5
                   ${
                     selected
                       ? "bg-[#5BC0BE] text-white shadow"
                       : "text-black hover:bg-white/[0.12] hover:text-white"
                   }`
                        }
                      >
                        Test
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-2 ">
                      <Tab.Panel
                        key={0}
                        tabIndex={0}
                        className={`rounded-xl bg-white p-3
                ring-white ring-opacity-60 ring-offset-2 duration-300  ring-offset-blue-400 focus:outline-none focus:ring-2`}
                      >
                        <ReactMarkdown>
                          {course.lessons[clicked].content}
                        </ReactMarkdown>
                      </Tab.Panel>
                      <Tab.Panel
                        key={1}
                        tabIndex={1}
                        className={`rounded-xl bg-white p-3
                ring-white ring-opacity-60 ring-offset-2 duration-300  ring-offset-blue-400 focus:outline-none focus:ring-2`}
                      >
                        <Discussion
                          lessonId={course?.lessons[clicked]?._id}
                          discussions={course?.lessons[clicked].discussions}
                          index={clicked}
                        />
                      </Tab.Panel>
                      <Tab.Panel
                        key={2}
                        tabIndex={2}
                        className={`rounded-xl bg-white p-3
                ring-white ring-opacity-60 ring-offset-2 duration-300  ring-offset-blue-400 focus:outline-none focus:ring-2`}
                      >
                        <Note setNote={setNote} note={note} />
                        <div
                          onClick={saveNote}
                          className=" px-4 w-[8rem] text-center py-2 bg-[#5BC0BE] mt-3 rounded-md text-white shadow-lg hover:scale-105 duration-300 cursor-pointer"
                        >
                          Save
                        </div>
                      </Tab.Panel>
                      <Tab.Panel
                        key={3}
                        tabIndex={3}
                        className={`rounded-xl bg-white p-3
                ring-white ring-opacity-60 ring-offset-2 duration-700  ring-offset-blue-400 focus:outline-none focus:ring-2`}
                      >
                        {question ? (
                          <div
                            className={` w-full px-4 py-2 text-white bg-[#5BC0BE] shadow-2xl duration-700  rounded-md ${
                              selectedCompletedTest?.completed
                                ? "flex flex-col items-center justify-center"
                                : "grid  grid-cols-2"
                            }`}
                          >
                            {selectedCompletedTest?.completed ? (
                              <>
                                <button
                                  onClick={viewResult}
                                  className="px-3 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black hover:border-black "
                                >
                                  View Results
                                </button>
                                {showScore && (
                                  <div className="py-3 text-2xl font-bold ">{`Results: ${selectedCompletedTest?.score}  / ${question.questions.length}`}</div>
                                )}
                                <button
                                  onClick={retakeTest}
                                  className="px-3 mt-1 text-xs border-2 border-white rounded-lg hover:bg-white hover:text-black hover:border-black"
                                >
                                  Retake Test
                                </button>
                              </>
                            ) : (
                              <>
                                <div>
                                  <h1 className="py-1 text-xl font-bold border-b-2">{`Question ${
                                    currentQuestion + 1
                                  }`}</h1>
                                  <h1 className="py-3 text-xl font-normal ">
                                    {question?.questions &&
                                      question?.questions[currentQuestion]
                                        .questionText}
                                  </h1>
                                </div>
                                <div className="flex flex-col items-center justify-center w-full py-3 mt-2">
                                  {question.questions &&
                                    question.questions[
                                      currentQuestion
                                    ].answerOptions.map(
                                      (answerOption, index) => (
                                        <button
                                          className="px-5 py-2 mt-2 text-left border-2 hover:bg-white hover:text-black rounded-xl"
                                          key={index}
                                          onClick={() =>
                                            handleAnswerOptionClick(
                                              answerOption.isCorrect
                                            )
                                          }
                                        >
                                          {answerOption.answerText}
                                        </button>
                                      )
                                    )}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-start justify-center w-full ">
                            <h1 className="text-2xl font-bold ">
                              No Questions
                            </h1>
                          </div>
                        )}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentRoute>
  );
}
