import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CurrentTrackIdState } from "../atoms/SongAtom";
import useSpotify from "./useSpotify";
import { useRecoilValue } from "recoil";

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const currentTrackId = useRecoilValue(CurrentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        try {
          const { data } = await axios.get(
            `https://api.spotify.com/v1/tracks/${currentTrackId}`,
            {
              headers: {
                Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
              },
            }
          );
          // console.log(data);
          setSongInfo(data);
        } catch (err) {
          console.log("error");
          // console.log(currentTrackId);
        }
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);
  return songInfo;
};

export default useSongInfo;
