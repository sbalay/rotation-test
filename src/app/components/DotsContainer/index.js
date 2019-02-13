import React from "react";

import { useRotationDragHandler } from "../../hooks/useRotationDragHandler";
import { Dot } from "../Dot";

import styles from "./styles.module.scss";

export function DotsContainer() {
  const [containerEl, dragging, rotationDegress] = useRotationDragHandler();

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
