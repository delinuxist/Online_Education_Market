import React from "react";
import WithUserSidebar from "../../../components/hoc/withUserSidebar";
import Header from "../../../components/Layout/Header";
import AccountForm from "../../../components/settings/AccountForm";

const Account = () => {
  return (
    <section className="mt-[5rem]">
      <Header heading={"Edit Account Details"} />
      <AccountForm />
    </section>
  );
};

export default WithUserSidebar(Account);
