import { useSession } from "next-auth/react";
import React from "react";
import useSpotify from "./hooks/useSpotify";
import { useRecoilValue, useRecoilState } from "recoil";
import { CurrentTrackIdState, isPlayingState } from "./atoms/SongAtom";
import { useEffect, useState } from "react";
import useSongInfo from "./hooks/useSongInfo";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { VolumeOffIcon } from "@heroicons/react/outline";
import { useCallback } from "react";
import { debounce } from "lodash";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(CurrentTrackIdState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = async () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      // spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };
  console.log(songInfo);
  return (
    <div className="grid h-24 grid-cols-3 px-2 text-gray-500 bg-gradient-to-b from-black to-gray-900 md:text-base md:px-8 ">
      {/* left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden w-10 h-10 md:inline "
          src={songInfo?.album?.images[0]?.url}
          alt="trackImage"
        />
        <div>
          <h1 className="hidden text-white md:block ">{songInfo?.name}</h1>
          <p className="hidden text-sm md:block">
            {songInfo?.artists?.[0].name}
          </p>
        </div>
      </div>
      {/* center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="w-10 h-10 button" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="w-10 h-10 button" />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      {/* right */}
      <div className="flex items-center justify-end pr-12 space-x-4">
        <VolumeOffIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-14 md:w-28"
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className=" button"
        />
      </div>
    </div>
  );
};

export default Player;
