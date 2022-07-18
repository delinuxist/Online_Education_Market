import React from "react";
import { PlaylistState } from "./atoms/PlaylistAtoms";
import { useRecoilValue } from "recoil";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(PlaylistState);
  return (
    <div className="flex flex-col px-8 space-y-1 text-white pb-44">
      {playlist?.tracks?.items.map((track, i) => (
        <Song key={track?.track?.id} track={track?.track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
