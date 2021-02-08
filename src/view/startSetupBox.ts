import { GameHistory } from '../app/gameHistory/gameHistory';
import { runTimer } from '../app/timers/runTimer';
import { PLAYTIME } from '../app/types';

import { updatePlayerTimer } from './gameplaySidebar';

export const timer = (function () {
    let clockTimer = 300;
    const turn = GameHistory.whoseTurn();
    const wrapper = document.getElementById('wrapper');
    const startSetupBox = document.createElement('div');
    startSetupBox.className = 'startSetupBox';

    const startCover = document.createElement('div');
    startCover.className = 'startCover';
    wrapper.appendChild(startCover);

    const title = document.createTextNode('Chose start options:');
    const setupBoxTitle = document.createElement('div');
    setupBoxTitle.className = 'setupBoxTitle';
    setupBoxTitle.appendChild(title);
    startSetupBox.appendChild(setupBoxTitle);

    const playTimeForm = document.createElement('div');
    playTimeForm.id = 'playTimeForm';
    const playTimeTitle = document.createTextNode('Round time:  ');
    const playTimeTitleDiv = document.createElement('div');
    playTimeTitleDiv.appendChild(playTimeTitle);
    playTimeForm.appendChild(playTimeTitleDiv);
    const playTimeSelect = document.createElement('select');
    playTimeSelect.id = 'playTimeSelect';
    startSetupBox.appendChild(playTimeForm);
    playTimeForm.appendChild(playTimeSelect);

    for (let i = 0; i < PLAYTIME.length; i++) {
        const timeOption = document.createElement('option');
        timeOption.value = PLAYTIME[i].value.toString();
        timeOption.text = PLAYTIME[i].text;
        playTimeSelect.appendChild(timeOption);
    }

    const startGameButton = document.createElement('input');
    startGameButton.setAttribute('type', 'submit');
    startGameButton.className = 'startGameButton';
    startGameButton.value = 'Start game';
    startSetupBox.appendChild(startGameButton);
    wrapper.appendChild(startSetupBox);

    startGameButton.addEventListener('click', () => {
        const { value } = document.getElementById('playTimeSelect') as HTMLInputElement;
        clockTimer = parseInt(value) * 60;
        updatePlayerTimer({ id: 'whitePlayerTimer', time: clockTimer });
        updatePlayerTimer({ id: 'blackPlayerTimer', time: clockTimer });
        wrapper.removeChild(startSetupBox);
        wrapper.removeChild(startCover);
        runTimer.runFirstTimer({ side: turn, clockTimer });
    });
    return {
        clockTimer,
    };
})();
