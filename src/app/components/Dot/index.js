import React from "react";

import styles from "./styles.module.scss";

// Dots' color could be one of red or blue
export function Dot({ red = false }) {
  return <div className={`${styles.dot} ${red ? styles.red : styles.blue}`} />;
}
