import React, { useState, useEffect, useContext } from "react";
import InstructorSidebar from "../Layout/InstructorSidebar";
import InstructorRoute from "../routes/InstructorRoute";

const WithInstructorSidebar = (WrappedComponent) => {
  const withInstructorSidebar = ({ props }) => (
    <div className="flex">
      {/* <div className="grid grid-cols-12"> */}
      <div
      //  className={`${!open && "col-span-1"} ${open && "col-span-2"}`}
      >
        <InstructorSidebar />
      </div>

      <InstructorRoute>
        <div className="overflow-y-auto">
          <WrappedComponent {...props} />
        </div>
      </InstructorRoute>
    </div>
  );

  return withInstructorSidebar;
};

export default WithInstructorSidebar;
