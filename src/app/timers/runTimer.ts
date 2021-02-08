import { updatePlayerTimer } from '../../view/gameplaySidebar';
import { Side } from '../types';
import { playerTimerClockSwitch } from '../../view/playerTimerClockSwitch';

type RunFirstTimerParams = {
    side: Side;
    clockTimer: number;
};

export const runTimer = (function () {
    let runTimerSide: Side;
    let runTimerClockTimerBlack: number;
    let runTimerClockTimerWhite: number;
    let intervalId: NodeJS.Timeout;
    const runFirstTimer = ({ side, clockTimer }: RunFirstTimerParams): void => {
        runTimerSide = side;
        runTimerClockTimerBlack = clockTimer;
        runTimerClockTimerWhite = clockTimer;
        startInterval();
    };
    const startInterval = () => {
        playerTimerClockSwitch(runTimerSide);
        if (runTimerSide === Side.WHITE) {
            intervalId = setInterval(() => {
                runTimerClockTimerWhite--;
                updatePlayerTimer({ id: 'whitePlayerTimer', time: runTimerClockTimerWhite });
            }, 1000);
        } else {
            intervalId = setInterval(() => {
                runTimerClockTimerBlack--;
                updatePlayerTimer({ id: 'blackPlayerTimer', time: runTimerClockTimerBlack });
            }, 1000);
        }
    };

    const clearAllIntervals = () => {
        clearInterval(intervalId);
        runTimerSide = runTimerSide === Side.WHITE ? Side.BLACK : Side.WHITE;
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