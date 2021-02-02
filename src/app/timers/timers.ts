export class Timer {
    init(): void {}
    toggle(): void {}
    setTimers(): void {}
}
//
// import { updatePlayerTimer } from './gameplaySidebar';
// import { winnerDialogBox } from './winnerDialogBox';
//
// export const runTimer = (function () {
//     let runTimerSide;
//     let runTimerClockTimerBlack;
//     let runTimerClockTimerWhite;
//     let intervalId;
//
//     const runFirstTimer = (side, clockTimer) => {
//         runTimerSide = side;
//         runTimerClockTimerBlack = clockTimer;
//         runTimerClockTimerWhite = clockTimer;
//         startInterval(runTimerSide, runTimerClockTimerWhite);
//     };
//
//     const startInterval = () => {
//         if (runTimerSide === 'white') {
//             document.getElementById('whitePlayerTimer').classList.remove('disabledClock');
//             document.getElementById('blackPlayerTimer').classList.add('disabledClock');
//         } else {
//             document.getElementById('blackPlayerTimer').classList.remove('disabledClock');
//             document.getElementById('whitePlayerTimer').classList.add('disabledClock');
//         }
//         if (runTimerSide === 'white') {
//             intervalId = setInterval(() => {
//                 runTimerClockTimerWhite--;
//                 updatePlayerTimer(document.getElementById('whitePlayerTimer'), runTimerClockTimerWhite);
//                 if (runTimerClockTimerWhite < 0) {
//                     winnerDialogBox();
//                 }
//             }, 1000);
//         } else {
//             intervalId = setInterval(() => {
//                 runTimerClockTimerBlack--;
//                 updatePlayerTimer(document.getElementById('blackPlayerTimer'), runTimerClockTimerBlack);
//                 if (runTimerClockTimerBlack < 0) {
//                     winnerDialogBox();
//                 }
//             }, 1000);
//         }
//     };
//
//     const clearAllIntervals = () => {
//         clearInterval(intervalId);
//         runTimerSide = runTimerSide === 'white' ? 'black' : 'white';
//     };
//
//     const setOpponentsTimer = () => {
//         clearAllIntervals();
//         startInterval();
//     };
//     return {
//         runFirstTimer,
//         setOpponentsTimer,
//     };
// })();
