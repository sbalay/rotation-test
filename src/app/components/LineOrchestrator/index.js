import React, { useState } from "react";

import { Line } from "../Line";
import { useInterval } from "../../hooks/useInterval";

export function LineOrchestrator({ dotsCoords }) {
  const [lines, setLines] = useState([]);

  useInterval(
    () => {
      setLines([...lines, Math.random() * 360]);
    },
    lines.length > 10 ? null : 500
  );

  return lines.map((lineRotation, i) => <Line key={i} rotation={lineRotation} />);
}
