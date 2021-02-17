import { Side } from '../app/types';
import { INITIAL_DEFAULT_TIMER } from '../app/globals';
import { timerTimeToString } from '../app/timers/timerTimeToString';

import { GameHistoryView } from './gameHistory';
import { playerName } from './gameplaySidebar/playerName';
import { timerView } from './timers/timerView';
import { gameControls } from './gameControls';
import { updatePlayerTimer } from './gameplaySidebar/updatePlayerTimer';
import { timer } from './startSetupBox';

timerTimeToString(timer().clockTimer);

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

    updatePlayerTimer({ id: 'blackPlayerTimer', time: INITIAL_DEFAULT_TIMER });
    updatePlayerTimer({ id: 'whitePlayerTimer', time: INITIAL_DEFAULT_TIMER });
};
