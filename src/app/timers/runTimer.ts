import { Side } from '../types';
import { playerTimerClockSwitch } from '../../view/playerTimerClockSwitch';
import winnerDialogBox from '../../view/winnerDialogBoxView';
import { INTERVAL_MS } from '../globals';
import { updatePlayerTimer } from '../../view/gameplaySidebar/updatePlayerTimer';

type RunFirstTimerParams = {
    side: Side;
    clockTimer: number;
};

export const runTimer = (function () {
    let runTimerSide: Side;
    let runTimerClockTimerBlack = 0;
    let runTimerClockTimerWhite = 0;
    let intervalId: NodeJS.Timeout;

    const runFirstTimer = ({ side, clockTimer }: RunFirstTimerParams) => {
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
                if (runTimerClockTimerWhite === 0) {
                    winnerDialogBox();
                }
            }, INTERVAL_MS);
        } else {
            intervalId = setInterval(() => {
                runTimerClockTimerBlack--;
                updatePlayerTimer({ id: 'blackPlayerTimer', time: runTimerClockTimerBlack });
                if (runTimerClockTimerBlack === 0) {
                    winnerDialogBox();
                }
            }, INTERVAL_MS);
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
        clearAllIntervals,
        timers: {
            whiteTimer: runTimerClockTimerBlack,
            blackTimer: runTimerClockTimerWhite,
        },
    };
})();
