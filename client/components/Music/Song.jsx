import React from "react";
import useSpotify from "./hooks/useSpotify";
import { useRecoilState } from "recoil";
import { millisToMinutesAndSecond } from "./lib/millisToMinutesAndSeconds";
import { CurrentTrackIdState, isPlayingState } from "./atoms/SongAtom";

const Song = ({ track, order }) => {
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(CurrentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const spotifyApi = useSpotify();

  const playSong = () => {
    setCurrentTrackId(track?.id);
    setIsPlaying(true);
    // spotifyApi.play({
    //   uris: [track?.uri],
    // });
  };

  // console.log(track);
  return (
    <div
      className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p className="font-ligth ">{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track.album?.images[0]?.url}
          alt="Img"
        />
        <div>
          <p className="text-white truncate w-36 lg:w-64 ">{track?.name}</p>
          <p className="flex w-40">
            {track?.artists.map((artist) => (
              <span className="mr-2 " key={artist.name}>
                {`${artist.name}`}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="hidden w-40 ml-auto md:inline md:ml-8">
          {track.album.name}
        </p>
        <p>{millisToMinutesAndSecond(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
