import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import UpdateCourseForm from "../../../../components/forms/UpdateCourseForm";
import WithInstructorSidebar from "../../../../components/hoc/withInstructorSidebar";
import Header from "../../../../components/Layout/Header";

const EditCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "0.00",
    uploading: false,
    paid: true,
    category: "",
  });
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      const {
        data: { course },
      } = await axios.get(`/server/course/${slug}`);
      console.log(course);
      {
        course && setValues(course);
      }

      setPreview(course?.image.Location);
      setImage(course?.image);
    } catch (err) {
      console.log(err);
    }
  };

  // handle change
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/server/course/${slug}`, {
        ...values,
        image,
      });
      toast.success("Course Updated..");
      router.push("/instructor");
      // router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };

  const handleImage = (e) => {
    let image = e.target.files[0];
    setPreview(window.URL.createObjectURL(image));
    setLoading(true);

    // resize image
    Resizer.imageFileResizer(image, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        const { data } = await axios.post("/server/course/upload-image", {
          image: uri,
        });
        setImage(data);
        setLoading(false);
        toast.success("Image Uploaded....");
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error("Image Upload failed...");
      }
    });
  };

  // remove Image
  const removeImage = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/server/course/remove-image", { image });
      setImage({});
      setPreview("");
      setLoading(false);
      toast.success("Image removed...");
    } catch (err) {
      setLoading(false);
      toast.error("Failed to remove image");
    }
  };

  return (
    // <InstructorRoute>
    <div className="w-full h-full pt-[5rem]">
      <Header heading={"Edit Course"} />
      <div className="flex justify-center w-full h-full">
        <div className="w-[50rem] h-full mt-10">
          <UpdateCourseForm
            handleChange={handleChange}
            values={values}
            preview={preview}
            handleImage={handleImage}
            removeImage={removeImage}
            handleSubmit={handleSubmit}
            loading={loading}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
    /* </InstructorRoute> */
  );
};

export default WithInstructorSidebar(EditCourse);
