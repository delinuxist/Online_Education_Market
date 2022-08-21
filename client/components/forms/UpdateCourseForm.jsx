import React from "react";
import Image from "next/image";
import { BsCloudUploadFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import { Switch } from "@headlessui/react";

const UpdateCourseForm = ({
  handleChange,
  values,
  preview,
  removeImage,
  handleImage,
  handleSubmit,
  loading,
  setValues,
}) => {
  return (
    <form>
      <input
        className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
        type="text"
        name="name"
        placeholder="Course Name"
        onChange={handleChange}
        value={values?.name}
      />

      <textarea
        className="w-full px-2 py-2 mb-2 border rounded-lg outline-none border-slate-900"
        name="description"
        value={values?.description}
        onChange={handleChange}
        cols="5"
        rows="5"
        placeholder="Course Description"
      ></textarea>
      <div className="flex flex-row">
        <div className={` w-full ${values?.paid && "mr-3"}`}>
          <select
            name="paid"
            value={values?.paid}
            onChange={(e) => setValues({ ...values, paid: !values?.paid })}
            className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
          >
            <option value={true}>Paid</option>
            <option value={false}>Free</option>
          </select>
        </div>
        {values?.paid && (
          <div className="w-full basis-1/4">
            <input
              type="number"
              name="price"
              value={values?.price}
              onChange={handleChange}
              className="w-full px-2 py-[0.44rem] border rounded-lg outline-none border-slate-900"
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className=" w-[30rem]">
          <input
            className="w-full px-2 py-2 mb-3 border rounded-lg outline-none border-slate-900"
            type="text"
            name="category"
            placeholder="Course Category"
            onChange={handleChange}
            value={values.category}
          />
        </div>

        <div className="flex items-center ">
          <span className="ml-3 mr-3">Set Upcoming</span>
          <Switch
            checked={values.upcoming}
            onChange={() =>
              setValues({
                ...values,
                upcoming: !values.upcoming,
              })
            }
            className={`${values.upcoming ? "bg-[#5BC0BE]" : "bg-teal-700"}
              relative inline-flex h-[30px] w-[63px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${values.upcoming ? "translate-x-8" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
        </div>
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
              {/* <label>
              <div className="text-white ">
                <BsCloudUploadFill size={30} />
              </div>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImage}
                hidden
              />
            </label> */}
            </div>
          </div>
        ) : (
          <label>
            {loading ? (
              "Uploading"
            ) : (
              <div className="flex flex-col items-center">
                <h1>Image Upload</h1>
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
        disabled={loading || values?.uploading}
        className="w-full py-2 bg-[#5BC0BE] hover:text-white hover:scale-105 duration-200 rounded-lg shadow-lg ease-in-out "
      >
        {loading ? "Image Uploading..." : "Update"}
      </button>
    </form>
  );
};

export default UpdateCourseForm;
