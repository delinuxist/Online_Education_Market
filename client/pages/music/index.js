import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import WithUserSidebar from "../../components/hoc/withUserSidebar";
import Center from "../../components/Music/Center";
import Player from "../../components/Music/Player";
import Sidebar from "../../components/Music/Sidebar";

const MusicHome = () => {
  const { data: session } = useSession();

  // const { user } = session;
  const router = useRouter();
  useEffect(() => {
    if (!session?.user) {
      router.push("/music/login");
    }
  }, [session]);

  console.log(session?.user);
  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <div className="pt-[5rem] w-full">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default WithUserSidebar(MusicHome);

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
