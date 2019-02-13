import React, { useState, useRef } from "react";

import { Dot } from "../Dot";

import styles from "./styles.module.scss";

function calculateRotationAngle(element, { clientX, clientY }) {
  const centerY = element.offsetTop + element.offsetHeight / 2;
  const centerX = element.offsetLeft + element.offsetLeft / 2;
  const angle = 57.296 * Math.atan((centerY - clientY) / (centerX - clientX));
  const chain = clientX - centerX <= 0 ? -180 : 0;
  return chain + angle;
}

export function DotsContainer() {
  const [rotationDegress, setRotationDegress] = useState(0);
  const containerEl = useRef(null);
  const moveHandlerRef = useRef(null);
  const lastAngleRef = useRef(null);

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
  moveHandlerRef.current = moveHandlerRef.current || handleMove;

  function stopRecording() {
    containerEl.current.removeEventListener("touchmove", moveHandlerRef.current);
    containerEl.current.removeEventListener("mousemove", moveHandlerRef.current);
  }

  function startRecording({ clientX, clientY }) {
    lastAngleRef.current = null;
    containerEl.current.addEventListener("touchmove", moveHandlerRef.current);
    containerEl.current.addEventListener("mousemove", moveHandlerRef.current);
  }

  return (
    <div
      className={styles.dotsContainer}
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      ref={containerEl}
      style={{ transform: `rotate(${rotationDegress}deg)` }}
    >
      <Dot red />
      <Dot />
    </div>
  );
}
