import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(
  () => {
    return import("jodit-react");
  },
  { ssr: false }
);

const Note = ({ note, setNote }) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      value={note}
      ref={editor}
      onChange={(content) => setNote(content)}
    />
  );
};

export default Note;
