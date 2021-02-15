import { defaultPlayerNames } from '../../app/startSetupBox/defaultPlayerNames';
import { Side } from '../../app/types';

export const addPlayerNameContainer = (side: Side) => {
    const playerNameContainer = document.createElement('div');
    playerNameContainer.id = `${side === Side.WHITE ? 'white' : 'black'}PlayerNameContainer`;
    playerNameContainer.className = 'addPlayerNameContainer';

    const playerNameLabel = document.createElement('label');
    playerNameLabel.innerText = `${side === Side.WHITE ? 'white' : 'black'} player name:`;
    const playerNameInput = document.createElement('input');
    playerNameInput.id = `${side === Side.WHITE ? 'white' : 'black'}PlayerNameInput`;
    playerNameInput.setAttribute('type', 'text');

    playerNameInput.defaultValue = defaultPlayerNames(side);

    playerNameContainer.appendChild(playerNameLabel);
    playerNameContainer.appendChild(playerNameInput);
    return playerNameContainer;
};
