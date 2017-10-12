function beautifyTime(timeInMS) {
  const totalSeconds = timeInMS / 1e3;

  if (totalSeconds <= 0) {
    return '';
  } else if (totalSeconds < 10) {
    return ~~totalSeconds + '.' + ((~~(totalSeconds * 10)) % 10);
  } else {
    const totalWholeSeconds = ~~(totalSeconds);
    const minutes = ~~(totalWholeSeconds / 60);
    const seconds = totalWholeSeconds % 60;

    return minutes + ':' + seconds;
  }
}

export default beautifyTime;
