import { useRef, useEffect, useState } from "react";

import { calculateRotationAngle } from "../utils/MathUtils";

export function useRotationDragHandler(dragCallback) {
  const containerEl = useRef(null);
  const lastAngleRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [rotationDegress, setRotationDegress] = useState(false);

  function handleMove({ changedTouches, x, y }) {
    const { clientX, clientY } = changedTouches ? changedTouches[0] : { clientX: x, clientY: y };
    const rotationAngle = calculateRotationAngle(containerEl.current, { clientX, clientY });
    const lastAngle = lastAngleRef.current;
    lastAngleRef.current = rotationAngle;
    if (!lastAngle) {
      return;
    }
    setRotationDegress(before => before - lastAngle + rotationAngle);
    dragCallback();
  }

  function stopRecording() {
    containerEl.current.removeEventListener("touchmove", handleMove);
    containerEl.current.removeEventListener("mousemove", handleMove);
    setDragging(false);
  }

  function startRecording({ clientX, clientY }) {
    lastAngleRef.current = null;
    containerEl.current.addEventListener("touchmove", handleMove);
    containerEl.current.addEventListener("mousemove", handleMove);
    setDragging(true);
  }

  useEffect(() => {
    containerEl.current.addEventListener("mouseup", stopRecording);
    containerEl.current.addEventListener("mousedown", startRecording);
    // TODO: remove listeners
  }, []);

  return [containerEl, dragging, rotationDegress];
}
