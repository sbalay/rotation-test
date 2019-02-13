import React, { Fragment } from "react";

import { DotsContainer } from "./components/DotsContainer";
import { LineOrchestrator } from "./components/LineOrchestrator";

export function App() {
  return (
    <Fragment>
      <LineOrchestrator />
      <DotsContainer />
    </Fragment>
  );
}
