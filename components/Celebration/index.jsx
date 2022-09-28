import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Celebration({ show }) {
  const { width, height } = useWindowSize();

  return <>{show && <Confetti width={width} height={height} />}</>;
}
