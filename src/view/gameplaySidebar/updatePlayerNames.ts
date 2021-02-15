import { defaultPlayerNames } from '../../app/startSetupBox/defaultPlayerNames';
import { Side } from '../../app/types';

export interface UpdatePlayerNamesParams {
    whitePlayerName: string;
    blackPlayerName: string;
}

export const updatePlayerNames = ({ whitePlayerName, blackPlayerName }: UpdatePlayerNamesParams) => {
    document.getElementById('whitePlayerName').innerText = whitePlayerName
        ? whitePlayerName
        : defaultPlayerNames(Side.WHITE);
    document.getElementById('blackPlayerName').innerText = blackPlayerName
        ? blackPlayerName
        : defaultPlayerNames(Side.BLACK);
};
