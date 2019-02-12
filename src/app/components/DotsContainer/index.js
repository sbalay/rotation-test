import React from "react";

import { Dot } from "../Dot";

import styles from "./styles.module.scss";

export function DotsContainer() {
  return (
    <div className={styles.dotsContainer}>
      <Dot red />
      <Dot />
    </div>
  );
}
