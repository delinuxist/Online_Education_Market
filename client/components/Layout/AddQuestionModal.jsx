import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";

const AddQuestionModal = ({
  isOpen,
  closeModal,
  currentLesson,
  run,
  loadCourse,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [questionsCount, setQuestionsCount] = useState(0);
  const [question, setQuestions] = useState();
  const [answerSection, setAnswerSection] = useState({
    answerText: "",
    isCorrect: false,
  });

  useEffect(() => {
    if (run) {
      getQuestion();
    }
  }, [run, questionsCount]);

  const getQuestion = async () => {
    try {
      const { data } = await axios.get(
        `/server/question/getQuestion/${currentLesson._id}`
      );
      {
        data.status === "success" && setQuestions(data.question);
      }
      // if (data.question.questions.length > 0) {
      //   setQuestionsCount(data.question.questions.length);
      // }
      {
        data.status === "success" &&
        data.question &&
        data.question.questions &&
        data.question.questions[questionsCount].questionText
          ? setQuestionText(
              data.question.questions[questionsCount].questionText
            )
          : setQuestionText("");
      }
    } catch (err) {
      toast("Error");
    }
  };

  // Function to add answers
  const addAnswers = async () => {
    if (!answerSection.answerText) {
      return toast.error("Answer Field can't be empty");
    }
    try {
      const { data } = await axios.post(
        `/server/question/addAnswers/${currentLesson._id}/${
          question ? question.questions[questionsCount]._id : "_"
        }`,
        {
          answerSection,
          questionText,
        }
      );
      getQuestion();
      toast.success("Answer Added...");
    } catch (err) {
      toast("Add Answers error");
    }

    // clear fields after saving
    setAnswerSection({ answerText: "", isCorrect: false });
  };

  const nextQuestion = async () => {
    setQuestionText("");
    setQuestionsCount(questionsCount + 1);

    try {
      const { data } = await axios.get(
        `/server/question/addQuestions/${currentLesson._id}`
      );
    } catch (err) {
      toast("next question Error");
    }
  };

  const doneAdding = async () => {
    try {
      const { data } = await axios.get(
        `/server/question/doneAdding/${currentLesson._id}`
      );
      if (data.status === "success") {
        loadCourse();
        closeModal();
      }
    } catch (err) {
      toast("done Adding Error");
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={`relative z-[150]`} onClose={closeModal}>
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
                    {`${questionsCount + 1}/${
                      currentLesson?.numberOfQuestions
                    }  Add Questions -
                       ${currentLesson?.title}
                       `}
                  </h1>
                  <div className="w-full h-full ">
                    <input
                      className="w-full px-2 py-2 mb-3 border rounded-lg outline-none"
                      type="text"
                      name="questionText"
                      placeholder="Input Question"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                    />
                    <div className="flex flex-col mb-4">
                      <label className="mb-2">Provide Possible Answers</label>
                      <input
                        className="px-2 py-2 mb-3 border rounded-lg outline-none "
                        type="text"
                        name="answerText"
                        placeholder="Answer"
                        value={answerSection.answerText}
                        onChange={(e) =>
                          setAnswerSection({
                            ...answerSection,
                            answerText: e.target.value,
                          })
                        }
                      />
                      <label className="mb-2 ">
                        <input
                          className="mr-2"
                          checked={answerSection.isCorrect}
                          type="checkbox"
                          name="isCorrect"
                          value={answerSection.isCorrect}
                          onChange={(e) =>
                            setAnswerSection({
                              ...answerSection,
                              isCorrect: true,
                            })
                          }
                        />
                        True
                      </label>
                      <label className="mb-2 ">
                        <input
                          className="mr-2"
                          checked={!answerSection.isCorrect}
                          type="checkbox"
                          name="isCorrect"
                          value={answerSection.isCorrect}
                          onChange={(e) =>
                            setAnswerSection({
                              ...answerSection,
                              isCorrect: false,
                            })
                          }
                        />
                        False
                      </label>

                      <div
                        onClick={addAnswers}
                        className="px-3 py-3 text-center bg-green-500 w-[10rem] text-white rounded-md cursor-pointer "
                      >
                        Add Answer
                      </div>
                    </div>
                    <div className="flex items-center justify-center w-full">
                      <button
                        onClick={
                          questionsCount ===
                          currentLesson?.numberOfQuestions - 1
                            ? doneAdding
                            : nextQuestion
                        }
                        className="px-3 py-3 text-center bg-green-500 w-[10rem] text-white rounded-md cursor-pointer hover:shadow-2xl "
                      >
                        {questionsCount === currentLesson?.numberOfQuestions - 1
                          ? "Done"
                          : "Next Question"}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddQuestionModal;
