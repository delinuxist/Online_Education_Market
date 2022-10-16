import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Context } from "../../context/index";
import DiscussList from "./DiscussList";

const Discussion = ({ lessonId, discussions, index }) => {
  const {
    state: { user },
  } = useContext(Context);

  const [comment, setComment] = useState("");
  const [lessonIndex, setLessonIndex] = useState(null);
  const [discussion, setDiscussion] = useState("");

  useEffect(() => {
    setDiscussion(discussions.reverse());
    setLessonIndex(index);
  }, [discussions, index]);

  const submitComment = async () => {
    try {
      const { data } = await axios.post("/server/user/addDiscussion", {
        comment: {
          name: user?.name,
          comment: comment,
          image: user?.avatar ? user?.avatar.Location : "",
        },
        lessonId: lessonId,
        index: lessonIndex,
      });

      // if (data.success) {
      //   const newDiscussion = [...discussion];
      //   newDiscussion.unshift({
      //     _id: Math.ceil(Math.random() * 5),
      //     name: user?.name,
      //     comment: comment,
      //     image: user?.avatar ? user?.avatar.Location : "",
      //   });

      //   setDiscussion(newDiscussion);

      //   setComment("");
      // }
      if (data.success) {
        setDiscussion(data?.updatedDiscussion.reverse());
        setComment("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-[30rem] border rounded-md w-full">
      <div className="h-[26.2rem] rounded-md border overflow-auto">
        {discussion.length === 0 ? (
          <div className="flex justify-center w-full py-4">
            <p className="text-2xl font-bold text-teal-500">
              {" "}
              Be the first to start a discussion!!!
            </p>
          </div>
        ) : (
          <>
            {discussion.map((discuss) => (
              <div key={discuss._id} className="px-4 py-3">
                <DiscussList discussion={discuss} />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="relative px-1 py-1">
        <input
          type="text"
          className="w-full rounded-md h-[3rem] pr-16"
          placeholder="Leave a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="absolute top-[22%] right-[1.5%]">
          <IoSend
            onClick={submitComment}
            className="text-[#5BC0BE] cursor-pointer"
            size={30}
          />
        </div>
      </div>
    </section>
  );
};

export default Discussion;
