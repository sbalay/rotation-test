import React, { useState } from "react";

import { Line } from "../Line";
import { useInterval } from "../../hooks/useInterval";

export function LineOrchestrator({ dotsCoords }) {
  const [lines, setLines] = useState([]);

  useInterval(
    () => {
      const line = { rotation: Math.random() * 360, red: Math.random() > 0.5 };
      setLines([...lines, line]);
    },
    lines.length > 10 ? null : 500
  );

  return lines.map((line, i) => (
    <Line key={i} rotation={line.rotation} red={line.red} dotsCoords={dotsCoords} />
  ));
}
