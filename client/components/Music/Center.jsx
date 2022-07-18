import { signOut, useSession } from "next-auth/react";
import Img from "../../public/assets/img/milad-fakurian-FTrDy_oxjmA-unsplash.jpg";
import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlaylistIdState, PlaylistState } from "./atoms/PlaylistAtoms";
import useSpotify from "./hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-purple-500",
  "from-violet-500",
  "from-pink-500",
  "from-orange-500",
  "from-indigo-500",
  "from-sky-500",
  "from-cyan-500",
  "from-teal-500",
];

const Center = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(PlaylistIdState);
  const [playlist, setPlaylist] = useRecoilState(PlaylistState);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("something went wrong", err));
  }, [spotifyApi, playlistId]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  // console.log(playlist);
  return (
    <div className="flex-grow h-screen overflow-y-scroll text-white scrollbar-hide ">
      <header className="absolute top-[5.5rem] right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center p-1 pr-2 space-x-3 bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
        >
          <img
            className="bg-white rounded-full w-7 h-7"
            src={
              session?.user?.image
                ? session?.user?.image
                : "https://cdn-icons-png.flaticon.com/512/892/892781.png?w=1380"
            }
            alt="profileImage"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5 " />
        </div>
      </header>

      <section
        className={` flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}
      >
        <img
          className="duration-300 rounded-lg shadow-2xl hover:scale-105 h-44 w-44"
          src={playlist?.images?.[0]?.url}
          alt="playListImg"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-3xl font-bold md:text-4xl xl:text-7xl">
            {playlist?.name}
          </h1>
          <p className="text-xs font-semibold">{`${session?.user?.name} 
 ${playlist?.tracks?.total} songs`}</p>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
