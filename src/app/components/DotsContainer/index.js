import React, { useState, useRef } from "react";

import { calculateRotationAngle } from "../../utils/MathUtils";
import { useDragHandler } from "../../hooks/useDragHandler";
import { Dot } from "../Dot";

import styles from "./styles.module.scss";

export function DotsContainer() {
  const [rotationDegress, setRotationDegress] = useState(0);
  const lastAngleRef = useRef(null);

  const [containerEl, dragging] = useDragHandler(handleMove, clearAngle);

  function handleMove({ changedTouches, x, y }) {
    const { clientX, clientY } = changedTouches ? changedTouches[0] : { clientX: x, clientY: y };
    const rotationAngle = calculateRotationAngle(containerEl.current, { clientX, clientY });
    const lastAngle = lastAngleRef.current;
    lastAngleRef.current = rotationAngle;
    if (!lastAngle) {
      return;
    }
    setRotationDegress(before => before - lastAngle + rotationAngle);
  }

  function clearAngle() {
    lastAngleRef.current = null;
  }

  return (
    <div
      className={`${styles.dotsContainer} ${dragging ? styles.dragging : ""}`}
      ref={containerEl}
      style={{ transform: `rotate(${rotationDegress}deg)` }}
    >
      <Dot red />
      <Dot />
    </div>
  );
}
