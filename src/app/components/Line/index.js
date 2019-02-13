import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

export function Line({ red = false, rotation = 0, right = false, blueDotRef, redDotRef }) {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMoving(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const classes = `${styles.line} ${red ? styles.red : styles.blue} ${
    right ? styles.right : styles.left
  }`;

  return (
    <div
      className={classes}
      style={{ transform: `rotate(${rotation}deg)`, left: moving ? "200%" : 0 }}
    />
  );
}
