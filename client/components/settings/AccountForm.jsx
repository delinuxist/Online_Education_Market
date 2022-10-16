import axios from "axios";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsCloudUploadFill } from "react-icons/bs";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { Context } from "../../context";
import { LOGIN } from "../../context/types";

const AccountForm = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const [preview, setPreview] = useState(user?.avatar?.Location);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(user?.avatar);
  const [formEmail, setFormEmail] = useState(user?.email);
  const [formName, setFormName] = useState(user?.name);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/server/user/updateUser", {
        formName,
        formEmail,
        image,
      });
      dispatch({
        type: LOGIN,
        payload: data?.newUser,
      });

      window.localStorage.setItem("user", JSON.stringify(data?.newUser));
      toast.success("Account Updated!!!");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <form className="w-[30rem] space-y-5">
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md"
            name="name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            placeholder="Email"
            className="w-full rounded-md"
            name="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center w-32 h-32 mb-5 rounded-lg shadow-xl group ring-1">
          {preview ? (
            <div className="relative h-full">
              <Image
                className="w-full h-full rounded-lg"
                src={preview}
                alt="preview"
                width={150}
                height={150}
              />
              <div className="absolute top-0 left-0 hidden w-full h-full rounded-lg group-hover:block bg-black/70" />
              <div className="absolute z-50 hidden top-1 right-1 group-hover:block">
                <div onClick={removeImage} className="cursor-pointer ">
                  <AiTwotoneDelete color="red" size={20} />
                </div>
              </div>
            </div>
          ) : (
            <label>
              {loading ? (
                "Uploading"
              ) : (
                <div className="flex flex-col items-center">
                  <h1>Avatar Upload</h1>
                  <BsCloudUploadFill size={30} />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImage}
                hidden
              />
            </label>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 bg-[#5BC0BE] hover:text-white hover:scale-105 duration-200 rounded-lg shadow-lg "
        >
          {loading ? "Processing" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
