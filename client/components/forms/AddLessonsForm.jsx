import { LoadingOutlined, SyncOutlined } from "@ant-design/icons";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import ReactPlayer from "react-player";

const AddLessonsForm = ({
  handleSubmit,
  values,
  uploading,
  closeModal,
  handleLesson,
  preview,
  handleVideo,
  uploadName,
  removeVideo,
  progress,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="w-full px-2 py-2 mb-3 border rounded-lg outline-none"
          type="text"
          name="title"
          placeholder="Lesson Title"
          value={values.title}
          onChange={handleLesson}
        />
        <textarea
          className="w-full px-2 py-2 mb-1 border rounded-lg"
          placeholder="Lessons Content"
          name="content"
          cols="5"
          rows="5"
          value={values.content}
          onChange={handleLesson}
        ></textarea>
        <div>
          <label>Number of Questions For Lesson: </label>
          <input
            className="w-[5rem] px-2 py-2 mb-3 border rounded-lg outline-none"
            type="number"
            name="numberOfQuestions"
            value={values.numberOfQuestions}
            onChange={handleLesson}
          />
        </div>
        {preview && (
          <div className="flex justify-center">
            <div className=" group w-72 shadow-2xl h-[7rem] rounded-lg relative">
              <div className="absolute top-0 hidden w-full h-full rounded-lg group-hover:block bg-black/50" />
              <ReactPlayer
                className="z-10 rounded-xl"
                url={preview}
                controls
                width={289}
                height={112}
                style={{ width: "100px" }}
              />

              {!uploading && (
                <div
                  onClick={removeVideo}
                  className="absolute z-10 hidden cursor-pointer group-hover:block top-2 right-2"
                >
                  <MdOutlineCancel color="red" size={20} />
                </div>
              )}
            </div>
          </div>
        )}
        <div className="mt-3 text-center ">
          <label className="px-4 py-2 mt-3 text-center border rounded-lg cursor-pointer">
            {uploadName}
            <input
              type="file"
              accept="video/*"
              name="video"
              onChange={handleVideo}
              hidden
            />
          </label>
          {progress != 0 && (
            <div className="flex justify-center ">
              <div className="w-[20rem] mt-3 bg-gray-200 rounded-full ">
                <div
                  className={`text-xs font-medium text-center bg-blue-600 ${
                    progress > 50 && "text-white"
                  } rounded-full`}
                  style={{ width: `${progress}%` }}
                >
                  {`${progress}%`}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-around mt-3">
          <button
            type="Submit"
            onClick={handleSubmit}
            disabled={uploading}
            className=" bg-[#5BC0BE] px-8 py-2 rounded-lg hover:border border-[#5BC0BE] hover:text-[#5BC0BE] hover:bg-transparent hover:scale-105 duration-300"
          >
            {uploading ? <LoadingOutlined /> : "Save"}
          </button>
          <div
            disabled={uploading}
            onClick={closeModal}
            className="px-6 py-2 duration-300 bg-red-600 border-red-600 rounded-lg cursor-pointer hover:scale-105 hover:text-red-600 hover:border hover:bg-transparent"
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLessonsForm;
