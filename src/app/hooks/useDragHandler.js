import { useRef, useEffect, useState } from "react";

export function useDragHandler(dragCallback, startRecordingCallback, stopRecordingCallback) {
  const containerEl = useRef(null);
  const [dragging, setDragging] = useState(false);

  function stopRecording() {
    stopRecordingCallback && stopRecordingCallback();
    containerEl.current.removeEventListener("touchmove", dragCallback);
    containerEl.current.removeEventListener("mousemove", dragCallback);
    setDragging(false);
  }

  function startRecording({ clientX, clientY }) {
    startRecordingCallback && startRecordingCallback();
    containerEl.current.addEventListener("touchmove", dragCallback);
    containerEl.current.addEventListener("mousemove", dragCallback);
    setDragging(true);
  }

  useEffect(() => {
    containerEl.current.addEventListener("mouseup", stopRecording);
    containerEl.current.addEventListener("mousedown", startRecording);
    // TODO: remove listeners
  }, []);

  return [containerEl, dragging];
}
