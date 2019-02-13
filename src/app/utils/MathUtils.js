export function getElementCenter(element) {
  const rect = element.getBoundingClientRect();
  return [rect.left + rect.width / 2, rect.top + rect.height / 2];
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
