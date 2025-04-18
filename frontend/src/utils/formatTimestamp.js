// Format seconds to M:SS (e.g., 30.5 → "0:30", 68.4 → "1:08")
export const formatTimestamp = (seconds) => {
  try {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const paddedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${paddedSeconds}`;
  } catch (error) {
    return "0:00";
  }
};
