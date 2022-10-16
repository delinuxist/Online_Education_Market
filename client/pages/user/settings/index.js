import React from "react";
import WithUserSidebar from "../../../components/hoc/withUserSidebar";
import Header from "../../../components/Layout/Header";
import { MdManageAccounts, MdPassword } from "react-icons/md";
import SettingsCard from "../../../components/settings/SettingsCard";

const Settings = () => {
  return (
    <section className="mt-[5rem]">
      <Header heading={"Settings"} />
      <div className="grid grid-cols-2 px-[5rem] py-[5rem]">
        <SettingsCard
          title={"Edit Account Details"}
          Icon={MdManageAccounts}
          link={"/user/settings/account"}
        />
        <SettingsCard
          title={"Change Password"}
          Icon={MdPassword}
          link={"/user/settings/password"}
        />
      </div>
    </section>
  );
};

export default WithUserSidebar(Settings);
