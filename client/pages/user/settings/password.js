import React from "react";
import WithUserSidebar from "../../../components/hoc/withUserSidebar";
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

export default WithUserSidebar(Password);
