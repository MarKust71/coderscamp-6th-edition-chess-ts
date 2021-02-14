import { setupTimerTime } from '../app/timers/setupTimerTime';
import { Side } from '../app/types';

import { GameHistoryView } from './gameHistory';
import { playerName } from './gameplaySidebar/playerName';
import { timer } from './startSetupBox';
import { timerView } from './timerView';
import { gameControls } from './gameControls';

export type UpdatePlayerTimerParams = {
    id: string;
    time: number;
};
setupTimerTime(timer().clockTimer);

export const gameplaySidebar = (): void => {
    const wrapper = document.getElementById('wrapper');

    const gameplaySidebar = document.createElement('div');
    gameplaySidebar.id = 'gameplaySidebar';
    wrapper.appendChild(gameplaySidebar);

    gameplaySidebar.appendChild(playerName('Player Black', Side.BLACK));
    gameplaySidebar.appendChild(timerView({ id: 'blackPlayerTimer' }));
    gameplaySidebar.appendChild(GameHistoryView.create());
    gameplaySidebar.appendChild(gameControls());
    gameplaySidebar.appendChild(timerView({ id: 'whitePlayerTimer' }));
    gameplaySidebar.appendChild(playerName('Player White', Side.WHITE));

    // updatePlayerTimer({ id: 'blackPlayerTimer', time: timer().clockTimer });
    // updatePlayerTimer({ id: 'whitePlayerTimer', time: timer().clockTimer });
};

export const updatePlayerTimer = ({ id, time }: UpdatePlayerTimerParams): void => {
    document.getElementById(id).innerHTML = setupTimerTime(time);
};
