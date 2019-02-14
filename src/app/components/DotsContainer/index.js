import React, { useRef } from "react";

import { useRotationDragHandler } from "../../hooks/useRotationDragHandler";
import { getElementCenter2 } from "../../utils/MathUtils";
import { Dot } from "../Dot";

import styles from "./styles.module.scss";

export function DotsContainer({ onDotsPositionChanged }) {
  const redDotRef = useRef(null);
  const blueDotRef = useRef(null);
  const [containerEl, dragging, rotationDegress] = useRotationDragHandler(() => {
    if (!redDotRef.current || !blueDotRef.current) {
      return;
    }

    const [redDotX, redDotY] = getElementCenter2(redDotRef.current);
    const [blueDotX, blueDotY] = getElementCenter2(blueDotRef.current);
    onDotsPositionChanged({
      red: { x: redDotX, y: redDotY },
      blue: { x: blueDotX, y: blueDotY }
    });
  });

  return (
    <div
      className={`${styles.dotsContainer} ${dragging ? styles.dragging : ""}`}
      ref={containerEl}
      style={{ transform: `rotate(${rotationDegress}deg)` }}
    >
      <Dot red ref={redDotRef} />
      <Dot ref={blueDotRef} />
    </div>
  );
}
