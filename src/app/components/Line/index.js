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

    const lineRect = lineRef.current.getBoundingClientRect();
    const [p0, p1] =
      (rotation >= 0 && rotation < 90) || (rotation >= 180 && rotation < 270)
        ? [
            { x: lineRect.left, y: window.innerHeight - lineRect.bottom },
            {
              x: lineRect.left + lineRect.width,
              y: window.innerHeight - lineRect.bottom + lineRect.height
            }
          ]
        : [
            { x: lineRect.left, y: window.innerHeight - lineRect.bottom + lineRect.height },
            { x: lineRect.left + lineRect.width, y: window.innerHeight - lineRect.bottom }
          ];

    const A = 1 / (p1.x - p0.x);
    const B = -1 / (p1.y - p0.y);
    const C = -p0.x / (p1.x - p0.x) + p0.y / (p1.y - p0.y);

    const distance =
      Math.abs(A * dotsCoords.red.x + B * dotsCoords.red.y + C) / Math.sqrt(A * A + B * B);

    if (distance < 25) {
      console.log("colission with red dot");
    }
  }, 16);

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
