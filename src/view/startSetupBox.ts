import { GameHistory } from '../app/gameHistory/gameHistory';
import { runTimer } from '../app/timers/runTimer';
import { PLAYTIME } from '../app/types';
import { INITIAL_DEFAULT_TIMER } from '../app/globals';

import { updatePlayerNames } from './gameplaySidebar/updatePlayerNames';
import { updatePlayerTimer } from './gameplaySidebar/updatePlayerTimer';
import { addPlayerNamesContainer } from './startSetupBox/addPlayerNamesContainer';

export const timer = function () {
    let clockTimer = INITIAL_DEFAULT_TIMER;
    const startGameButton = document.createElement('input');
    const wrapper = document.getElementById('wrapper');
    const startGameCover = document.createElement('div');
    const turn = GameHistory.whoseTurn();
    const startSetupBox = document.createElement('div');
    startSetupBox.className = 'startSetupBox';
    startSetupBox.id = 'startSetupBox';

    startGameCover.className = 'startGameCover';
    startGameCover.id = 'startGameCover';
    wrapper.appendChild(startGameCover);

    const title = document.createTextNode('Chose start options:');
    const setupBoxTitle = document.createElement('div');
    setupBoxTitle.className = 'setupBoxTitle';
    setupBoxTitle.appendChild(title);
    startSetupBox.appendChild(setupBoxTitle);

    startSetupBox.appendChild(addPlayerNamesContainer());

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

    startGameButton.setAttribute('type', 'submit');
    startGameButton.className = 'startGameButton';
    startGameButton.value = 'Start game';
    startSetupBox.appendChild(startGameButton);
    wrapper.appendChild(startSetupBox);

    startGameButton.addEventListener('click', () => {
        const whitePlayerName = document.getElementById('whitePlayerNameInput') as HTMLInputElement;
        const blackPlayerName = document.getElementById('blackPlayerNameInput') as HTMLInputElement;
        updatePlayerNames({ whitePlayerName: whitePlayerName.value, blackPlayerName: blackPlayerName.value });

        const { value } = document.getElementById('playTimeSelect') as HTMLInputElement;
        clockTimer = parseInt(value) * 60;
        updatePlayerTimer({ id: 'whitePlayerTimer', time: clockTimer });
        updatePlayerTimer({ id: 'blackPlayerTimer', time: clockTimer });
        wrapper.removeChild(document.getElementById('startSetupBox'));
        wrapper.removeChild(document.getElementById('startGameCover'));
        runTimer.runFirstTimer({ side: turn, clockTimer });
    });
    return {
        clockTimer,
        startSetupBox,
        startGameCover,
    };
};
