import React, { useEffect, useState, useRef } from "react";

import { useInterval } from "../../hooks/useInterval";

import styles from "./styles.module.scss";

const MOVE_DURATION = 5000;

export function Line({ red = false, rotation = 0, right = false, dotsCoords }) {
  const [moving, setMoving] = useState(false);
  const [mounted, setMounted] = useState(true);
  const lineRef = useRef(null);

  useEffect(function startMoving() {
    const timeout = setTimeout(() => {
      setMoving(true);
    });
    return () => clearTimeout(timeout);
  }, []);

  useEffect(function unmount() {
    const timeout = setTimeout(() => {
      setMounted(false);
    }, MOVE_DURATION);
    return () => clearTimeout(timeout);
  }, []);

  useInterval(function checkCollisions() {
    if (!lineRef.current) {
      return;
    }
  }, 10);

  const classes = `${styles.line} ${red ? styles.red : styles.blue} ${
    right ? styles.right : styles.left
  }`;

  return mounted ? (
    <div
      ref={lineRef}
      className={classes}
      style={{ transform: `rotate(${rotation}deg)`, left: moving ? "200%" : "-5%" }}
    />
  ) : null;
}
