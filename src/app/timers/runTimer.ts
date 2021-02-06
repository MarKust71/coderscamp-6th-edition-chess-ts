// export class Timer {
//     init(): void {}
//     toggle(): void {}
//     setTimers(): void {}
// }

import { updatePlayerTimer } from '../../view/gameplaySidebar';

// import { winnerDialogBox } from './winnerDialogBox';

export const runTimer = (function () {
    let runTimerSide: string;
    let runTimerClockTimerBlack: number;
    let runTimerClockTimerWhite: number;
    let intervalId: number;

    const runFirstTimer = (side: string, clockTimer: number) => {
        runTimerSide = side;
        runTimerClockTimerBlack = clockTimer;
        runTimerClockTimerWhite = clockTimer;
        startInterval(runTimerSide, runTimerClockTimerWhite);
    };

    const startInterval = (runTimerSide: string, runTimerClockTimerWhite: number) => {
        if (runTimerSide === 'white') {
            document.getElementById('whitePlayerTimer').classList.remove('disabledClock');
            document.getElementById('blackPlayerTimer').classList.add('disabledClock');
        } else {
            document.getElementById('blackPlayerTimer').classList.remove('disabledClock');
            document.getElementById('whitePlayerTimer').classList.add('disabledClock');
        }
        if (runTimerSide === 'white') {
            intervalId = setInterval(() => {
                runTimerClockTimerWhite--;
                updatePlayerTimer(document.getElementById('whitePlayerTimer'), runTimerClockTimerWhite);
                // if (runTimerClockTimerWhite < 0) {
                //     winnerDialogBox();
                // }
            }, 1000);
        } else {
            intervalId = setInterval(() => {
                runTimerClockTimerBlack--;
                updatePlayerTimer(document.getElementById('blackPlayerTimer'), runTimerClockTimerBlack);
                // if (runTimerClockTimerBlack < 0) {
                //     winnerDialogBox();
                // }
            }, 1000);
        }
    };

    const clearAllIntervals = () => {
        clearInterval(intervalId);
        runTimerSide = runTimerSide === 'white' ? 'black' : 'white';
    };

    const setOpponentsTimer = () => {
        clearAllIntervals();
        startInterval();
    };
    return {
        runFirstTimer,
        setOpponentsTimer,
    };
})();
