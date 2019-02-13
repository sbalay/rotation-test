function getElementCenter(element) {
  return [
    element.offsetLeft + element.offsetLeft / 2,
    element.offsetTop + element.offsetHeight / 2
  ];
}

function covertRadiansToDegress(radians) {
  return 57.296 * radians;
}

export function calculateRotationAngle(element, { clientX, clientY }) {
  const [centerX, centerY] = getElementCenter(element);
  const radians = Math.atan((centerY - clientY) / (centerX - clientX));
  const angle = covertRadiansToDegress(radians);
  const chain = clientX - centerX <= 0 ? -180 : 0;
  return chain + angle;
}