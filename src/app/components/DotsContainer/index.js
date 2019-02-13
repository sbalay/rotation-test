import React, { useState, useRef } from "react";

import { Dot } from "../Dot";

import styles from "./styles.module.scss";

export function DotsContainer() {
  const [rotationDegress, setRotationDegress] = useState(0);
  const containerEl = useRef(null);
  const moveHandlerRef = useRef(null);
  const lastLocationRef = useRef(null);

  function handleMove({ changedTouches, x, y }) {
    const { clientX, clientY } = changedTouches ? changedTouches[0] : { clientX: x, clientY: y };
    lastLocationRef.current = [clientX, clientY];
    setRotationDegress(lastValue => lastValue + 1);
  }
  moveHandlerRef.current = moveHandlerRef.current || handleMove;

  function stopRecording() {
    containerEl.current.removeEventListener("touchmove", moveHandlerRef.current);
    containerEl.current.removeEventListener("mousemove", moveHandlerRef.current);
    lastLocationRef.current = null;
  }

  function startRecording({ clientX, clientY }) {
    containerEl.current.addEventListener("touchmove", moveHandlerRef.current);
    containerEl.current.addEventListener("mousemove", moveHandlerRef.current);
    lastLocationRef.current = [clientX, clientY];
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
