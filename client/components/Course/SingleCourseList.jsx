import React from "react";

const SingleCourseList = ({
  lesson,
  index,
  setPreview,
  openPreviewModal,
  setModalName,
}) => {
  return (
    <div className="w-full pt-2">
      <div className="flex items-center justify-between border-b ">
        <div className="flex items-center p-3 cursor-pointer ">
          <div className="flex items-center justify-center mr-4 bg-gray-300 rounded-full h-14 w-14">
            <p className="font-bold "> {index + 1}</p>
          </div>
          <h1 className="text-xl ">{lesson.title}</h1>
        </div>

        {lesson.video && lesson.video !== null && lesson.free_preview && (
          <div className="pr-4">
            <div
              onClick={() => {
                setPreview(lesson.video.Location);
                setModalName("Lesson Preview");
                openPreviewModal();
              }}
              className="cursor-pointer  bg-[#5BC0BE] px-3 py-1 rounded-lg text-white shadow-md hover:scale-105 duration-300"
            >
              Preview
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleCourseList;
