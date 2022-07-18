export function millisToMinutesAndSecond(millis) {
  const minute = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minute + 1 + ":00"
    : minute + ":" + (seconds < 10 ? "0" : "") + seconds;
}
