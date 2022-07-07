import React, { useContext, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import ReactPlayer from "react-player";
import { Switch } from "@headlessui/react";
import { CURRENT } from "../../context/types";
import { Context } from "../../context";
import { LoadingOutlined } from "@ant-design/icons";

const EditLessonForm = ({
  current,
  setCurrent,
  handleVideo,
  removeVideo,
  handleUpdateLesson,
  progress,
  uploadName,
  uploading,
  preview,
}) => {
  const { dispatch } = useContext(Context);

  return (
    <div className="mb-2">
      <form onSubmit={handleUpdateLesson}>
        <input
          className="w-full px-2 py-2 mb-3 border rounded-lg outline-none"
          type="text"
          name="title"
          placeholder="Lesson Title"
          value={current.title}
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
        />
        <textarea
          className="w-full px-2 py-2 mb-1 border rounded-lg"
          placeholder="Lessons Content"
          name="content"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          cols="5"
          rows="5"
          value={current.content}
        ></textarea>
        {preview && (
          <div className="flex justify-center">
            <div className=" group w-72  h-[7rem] rounded-lg relative">
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
        <div className="mt-3 mb-5 ">
          <div className="flex items-center justify-center ">
            <div className="flex items-center justify-between  w-[40rem]">
              <label className="px-4 py-2 mt-3 border rounded-lg cursor-pointer">
                {uploadName}
                <input
                  type="file"
                  accept="video/*"
                  name="video"
                  onChange={handleVideo}
                  hidden
                />
              </label>
              <div className="flex items-center ">
                <span className="mr-3">Preview</span>
                <Switch
                  checked={current.free_preview}
                  onChange={() =>
                    setCurrent({
                      ...current,
                      free_preview: !current.free_preview,
                    })
                  }
                  className={`${
                    current.free_preview ? "bg-[#5BC0BE]" : "bg-teal-700"
                  }
              relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      current.free_preview ? "translate-x-9" : "translate-x-0"
                    }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            </div>
          </div>

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
        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-between w-[20rem]">
            <button
              onClick={handleUpdateLesson}
              className="px-6 py-2 text-2xl text-white  rounded-lg bg-[#5BC0BE] cursor-pointer hover:scale-105 duration-300"
              disabled={uploading}
            >
              {uploading ? <LoadingOutlined spin /> : "Update"}
            </button>
            <button
              disabled={uploading}
              className="px-3 py-2 text-2xl text-white duration-300 bg-red-500 rounded-lg cursor-pointer hover:scale-105 "
              onClick={() => {
                dispatch({
                  type: CURRENT,
                  payload: null,
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
        {/* <div>
          <pre>{JSON.stringify(current, null, 2)}</pre>
        </div> */}
        {/* <div className="flex items-center justify-around mt-3">
          <button
            type="Submit"
            className=" bg-[#5BC0BE] px-8 py-2 rounded-lg hover:border border-[#5BC0BE] hover:text-[#5BC0BE] hover:bg-transparent hover:scale-105 duration-300"
          >
            Save
          </button>
          <div className="px-6 py-2 duration-300 bg-red-600 border-red-600 rounded-lg cursor-pointer hover:scale-105 hover:text-red-600 hover:border hover:bg-transparent">
            Cancel
          </div>
        </div> */}
      </form>
    </div>
  );
};

export default EditLessonForm;
