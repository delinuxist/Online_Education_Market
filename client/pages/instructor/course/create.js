import React, { useState } from "react";
import CreateCourseForms from "../../../components/forms/CreateCourseForms";
import WithInstructorSidebar from "../../../components/hoc/withInstructorSidebar";

const createCourse = () => {
  return (
    // <InstructorRoute>
    <CreateCourseForms />
    // </InstructorRoute>
  );
};

export default WithInstructorSidebar(createCourse);
