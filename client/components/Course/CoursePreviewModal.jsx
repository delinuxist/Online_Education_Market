import { MdClose } from "react-icons/md";
import React from "react";
import ReactPlayer from "react-player";

const CoursePreviewModal = ({
  modalName,
  preview,
  closePreviewModal,
  previewModal,
}) => {
  return (
    <div className="w-full h-full ">
      <div className="flex items-center justify-between px-3 py-3 border-b">
        <h1 className="font-bold ">{modalName}</h1>
        <MdClose
          onClick={() => closePreviewModal()}
          title="close modal"
          size={20}
          color="red"
          className="duration-300 cursor-pointer hover:scale-105 "
        />
      </div>
      <div className="w-full pt-3">
        <ReactPlayer
          controls
          url={preview}
          playing={previewModal}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default CoursePreviewModal;
