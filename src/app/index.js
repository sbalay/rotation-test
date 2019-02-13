import React, { Fragment, useState } from "react";

import { DotsContainer } from "./components/DotsContainer";
import { LineOrchestrator } from "./components/LineOrchestrator";

export function App() {
  const [dotsCoords, setDotsCoords] = useState({
    red: { x: null, y: null },
    blue: { x: null, y: null }
  });

  return (
    <Fragment>
      <LineOrchestrator dotsCoords={dotsCoords} />
      <DotsContainer onDotsPositionChanged={setDotsCoords} />
    </Fragment>
  );
}
