import React, { forwardRef } from "react";

import styles from "./styles.module.scss";

// Dots' color could be one of red or blue
function DotComponent({ red = false }, ref) {
  return <div ref={ref} className={`${styles.dot} ${red ? styles.red : styles.blue}`} />;
}

export const Dot = forwardRef(DotComponent);
