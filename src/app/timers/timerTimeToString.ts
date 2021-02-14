export const timerTimeToString = (clockTimer: number): string => {
    let timeLeft: string;
    const minutes = Math.floor(clockTimer / 60);
    const seconds = clockTimer % 60;
    seconds >= 10 ? (timeLeft = `0${minutes}:${seconds}`) : (timeLeft = `0${minutes}:0${seconds}`);
    return timeLeft;
};
