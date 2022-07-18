import { atom } from "recoil";

export const CurrentTrackIdState = atom({
  key: "currentTrackIdKey",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingSpecialKey",
  default: false,
});
