import { Side } from '../../app/types';

import { addPlayerNameContainer } from './addPlayerNameContainer';

export const addPlayerNamesContainer = () => {
    const playerNamesContainer = document.createElement('div');

    const whitePlayerNameContainer = addPlayerNameContainer(Side.WHITE);
    const blackPlayerNameContainer = addPlayerNameContainer(Side.BLACK);

    playerNamesContainer.id = 'playerNamesContainer';
    playerNamesContainer.appendChild(whitePlayerNameContainer);
    playerNamesContainer.appendChild(blackPlayerNameContainer);

    return playerNamesContainer;
};
