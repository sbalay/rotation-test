import React from "react";

import styles from "./styles.module.scss";

export function Line({ red = false, rotation = 0, right = false }) {
  const classes = `${styles.line} ${red ? styles.red : styles.blue} ${
    right ? styles.right : styles.left
  }`;
  return <div className={classes} style={{ transform: `rotate(${rotation}deg)` }} />;
}
