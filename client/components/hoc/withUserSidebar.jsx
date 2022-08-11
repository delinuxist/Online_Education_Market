import React from "react";
import UserSidebar from "../Layout/UserSidebar";
import UserRoutes from "../routes/UserRoutes";

const WithUserSidebar = (WrappedComponent) => {
  const withUserSidebar = ({ props }) => (
    <div className="flex">
      {/* <div className="grid grid-cols-12"> */}
      <div
      //  className={`${!open && "col-span-1"} ${open && "col-span-2"}`}
      >
        <UserSidebar />
      </div>

      <UserRoutes>
        <div className="overflow-y-auto">
          <WrappedComponent {...props} />
        </div>
      </UserRoutes>
    </div>
  );

  return withUserSidebar;
};

export default WithUserSidebar;
