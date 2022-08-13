import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StudentRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetctUser();
    // return () => {
    //   setAuthenticated(false);
    // };
  }, []);

  const fetctUser = async () => {
    try {
      const { data } = await axios.get("/server/current-user");
      setAuthenticated(data.success);
    } catch (err) {
      toast.error(err.response.data.msg);
      setAuthenticated(false);
      router.push("/login");
    }
  };
  return (
    <div className="w-full h-full">
      {authenticated ? (
        <div className="w-full h-full ">{children}</div>
      ) : (
        <>
          <SyncOutlined
            spin
            className="flex items-center justify-center h-screen text-5xl font-bold text-cyan-400"
          />
        </>
      )}
    </div>
  );
};

export default StudentRoute;
