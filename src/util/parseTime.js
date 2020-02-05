export default (number) => {
    const minutes = Math.floor(number / 60);
    const seconds = number - (minutes * 60);
    let secondsStr;
    if (seconds < 10) {
        secondsStr = `0${seconds}`;
    } else {
        secondsStr = seconds;
    };
    return `${minutes}:${secondsStr}`;
};
