import React, { useState } from "react";

import { Line } from "../Line";
import { useInterval } from "../../hooks/useInterval";

export function LineOrchestrator() {
  const [lines, setLines] = useState([]);

  useInterval(
    () => {
      setLines([...lines, Math.random() * 360]);
    },
    lines.length > 10 ? null : 500
  );

  return lines.map(lineRotation => <Line rotation={lineRotation} />);
}
