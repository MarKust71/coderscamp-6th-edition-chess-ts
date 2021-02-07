import { Side } from '../app/types';

export const playerTimerClockSwitch = (side: Side): void => {
    console.log(side);
    if (side === Side.WHITE) {
        document.getElementById('whitePlayerTimer').classList.remove('disabledClock');
        document.getElementById('blackPlayerTimer').classList.add('disabledClock');
    } else {
        document.getElementById('blackPlayerTimer').classList.remove('disabledClock');
        document.getElementById('whitePlayerTimer').classList.add('disabledClock');
    }
};
