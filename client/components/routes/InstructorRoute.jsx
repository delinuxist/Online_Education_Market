import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";

const InstructorRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/server/current-instructor");
      {
        data && setAuthenticated(data.success);
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      setAuthenticated(false);
      router.push("/home");
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

export default InstructorRoute;
