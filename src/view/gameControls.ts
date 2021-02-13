import { GameHistory } from '../app/gameHistory/gameHistory';

import { playFromTheStart } from './controlButtons/playFromTheStart';

export function gameControls() {
    const controls = document.createElement('div');

    controls.classList.add('gameControls');
    controls.append(playFromTheStart(GameHistory.playFromTheStart));

    return controls;
}
