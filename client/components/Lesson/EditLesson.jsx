import React, {
  useEffect,
  useRef,
  Fragment,
  useState,
  useContext,
} from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from "axios";
import EditLessonForm from "../forms/EditLessonForm";
import { toast } from "react-toastify";
import { Context } from "../../context";
import { CURRENT } from "../../context/types";
import ConfirmModal from "../Layout/ConfirmModal";

const EditLesson = ({
  lessons,
  setLessons,
  slug,
  loadCourse,
  instructorId,
}) => {
  const listItems = useRef(null);
  const [current, setCurrent] = useState({});
  const [currentIndex, setCurrentIndex] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadName, setUploadName] = useState("Upload Video");
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    state: { currentLesson },
    dispatch,
  } = useContext(Context);

  const onDragEnd = () => {};

  const onDragEnter = () => {};

  const onDragLeave = () => {};

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDragStart = (e, index) => {
    // console.log("ondrag=>", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const onDrop = async (e, index) => {
    // console.log("on drop=>", index);
    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = lessons;

    let movingItem = lessons[movingItemIndex]; // dragged item to re-order

    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setLessons([...allLessons]);

    const { data } = await axios.put(`/server/course/${slug}`, {
      lessons,
    });

    loadCourse();
  };

  // remove single lesson
  const removeLesson = async (index) => {
    // const answer = window.confirm("Are you sure you want to delete");

    // if (!answer) return;

    console.log(index);

    let updatedLesson = lessons;
    const removed = updatedLesson.splice(index, 1);

    const video = removed[0].video;
    console.log(video);

    console.log(removed);

    try {
      const res = await axios.post(
        `/server/course/remove-video/${instructorId}`,
        {
          video,
        }
      );

      const { data } = await axios.put(
        `/server/course/delete-lesson/${slug}/${removed[0]._id}`
      );

      setIsOpen(false);

      loadCourse();
    } catch (err) {
      console.log(err.resoponse);
      toast(err.response.data.msg);
    }
  };

  // Edit lessons Functions
  const handleVideo = async (e) => {
    try {
      const video = e.target.files[0];
      setPreview(window.URL.createObjectURL(video));
      setUploadName(video.name);
      setUploading(true);
      const videoData = new FormData();
      videoData.append("video", video);
      const { data } = await axios.post(
        `/server/course/upload-video/${instructorId}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(parseInt(Math.round((100 * e.loaded) / e.total)));
          },
        }
      );

      setUploading(false);
      setCurrent({ ...current, video: data });
      toast.success("Video Uploaded");
    } catch (err) {
      setUploading(false);
      toast.error("Uploading Video failed");
    }
  };

  const removeVideo = async () => {
    console.log(current.video);
    try {
      setUploading(true);
      const video = current.video;
      const res = await axios.post(
        `/server/course/remove-video/${instructorId}`,
        {
          video,
        }
      );
      setUploading(false);
      setPreview("");
      setProgress(0);
      setUploadName("Upload Video");
      setCurrent({ ...current, video: {} });
      toast.success("Video Removed");
    } catch (err) {
      toast.error("Failed to remove video");
    }
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    console.log(current);
    try {
      const { data } = await axios.put(
        `/server/course/update-lesson/${slug}/${current._id}`,
        current
      );

      dispatch({
        type: CURRENT,
        payload: null,
      });
      loadCourse();
      setCurrent({});
      toast.success("Lesson Updated..");
    } catch (err) {
      toast.error("error updating lesson");
    }
  };

  return (
    <div className={`${currentLesson && "flex justify-between "}`}>
      <div>
        {lessons.map((lesson, index) => (
          <div onDragOver={onDragOver} key={index}>
            <div
              key={index}
              ref={listItems}
              draggable
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              onDragLeave={onDragLeave}
              onDragStart={(e) => onDragStart(e, index)}
              onDrop={(e) => onDrop(e, index)}
              className={`px-2 flex w-full items-center justify-between space-y-2 shadow-xl rounded-md h-[4rem] border mb-2 duration-300 border-slate-300 ${
                currentLesson && "w-[35rem]"
              }`}
            >
              <div
                key={index}
                onClick={() => {
                  setCurrent(lesson);
                  dispatch({
                    type: CURRENT,
                    payload: current,
                  });
                  setPreview(lesson.video?.Location);
                }}
                className="flex w-[30rem] cursor-pointer"
              >
                <HiOutlineMenuAlt1 size={30} className="mr-3" />
                <h1 className="text-xl ">{lesson.title}</h1>
              </div>
              <div
                onClick={() => {
                  setIsOpen(!isOpen);
                  setCurrentIndex(index);
                }}
                className="cursor-pointer"
              >
                <MdOutlineDeleteOutline color="red" size={30} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentLesson && (
        <div className=" w-[35rem]">
          <EditLessonForm
            current={current}
            setCurrent={setCurrent}
            handleVideo={handleVideo}
            handleUpdateLesson={handleUpdateLesson}
            preview={preview}
            progress={progress}
            uploadName={uploadName}
            uploading={uploading}
            removeVideo={removeVideo}
          />
        </div>
      )}
      <ConfirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Delete Lesson"}
        currentIndex={currentIndex}
        command={removeLesson}
        message={"Are you sure you want to delete lesson?"}
      />
    </div>
  );
};

export default EditLesson;

{
  /* <EditLessonForm
                      current={current}
                      setCurrent={setCurrent}
                      handleVideo={handleVideo}
                      handleUpdateLesson={handleUpdateLesson}
                      preview={preview}
                      progress={progress}
                      uploadName={uploadName}
                      uploading={uploading}
                      removeVideo={removeVideo}
                    /> */
}
