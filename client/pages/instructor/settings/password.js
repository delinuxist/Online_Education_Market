import React from "react";
import WithInstructorSidebar from "../../../components/hoc/withInstructorSidebar";
import Header from "../../../components/Layout/Header";
import ChangePasswordForm from "../../../components/settings/ChangePasswordForm";

const Password = () => {
  return (
    <section className="mt-[5rem]">
      <Header heading={"Change Password"} />
      <ChangePasswordForm />
    </section>
  );
};

export default WithInstructorSidebar(Password);
