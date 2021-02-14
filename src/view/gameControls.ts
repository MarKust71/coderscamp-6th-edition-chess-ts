import { GameHistory } from '../app/gameHistory/gameHistory';

import { playFromTheStart } from './controlButtons/playFromTheStart';
import { undoMove } from './controlButtons/undoMove';

export function gameControls() {
    const controls = document.createElement('div');

    controls.classList.add('gameControls');
    controls.append(playFromTheStart(GameHistory.playFromTheStartListener));
    controls.append(undoMove(GameHistory.undoMove));

    return controls;
}
