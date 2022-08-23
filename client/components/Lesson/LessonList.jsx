import React, { Fragment } from "react";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import AddQuestionModal from "../Layout/AddQuestionModal";

const LessonList = ({ lesson, index, loadCourse }) => {
  const [questionsCount, setQuestionsCount] = useState(0);
  const [currentLesson, setCurrentLesson] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [run, setRun] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
    setCurrentLesson(lesson);
    setRun(true);
  };

  const noTest = () => {
    console.log("no test");
  };

  return (
    <div className="flex items-center justify-between p-3 border-b ">
      <div className="flex items-center p-3 cursor-pointer ">
        <div className="flex items-center justify-center mr-4 bg-gray-300 rounded-full h-14 w-14">
          <p className="font-bold "> {index + 1}</p>
        </div>
        <h1 className="text-xl ">{lesson.title}</h1>
      </div>
      <div>
        <button
          onClick={lesson.numberOfQuestions > 0 ? openModal : noTest}
          className="px-3 mr-5 py-3 bg-[#5BC0BE] rounded-md text-white "
        >
          {lesson.numberOfQuestions > 0 && lesson?.testAdded
            ? "Test Added"
            : !lesson?.testAdded
            ? "Add Test"
            : "No Test"}
        </button>
        {/* add questions modal */}
        <AddQuestionModal
          closeModal={closeModal}
          isOpen={isOpen}
          currentLesson={currentLesson}
          run={run}
          loadCourse={loadCourse}
        />
      </div>
    </div>
  );
};

export default LessonList;
