import { Side } from '../../app/types';

export const playerName = (name: string, side: Side): HTMLDivElement => {
    const playerName = document.createElement('div');
    playerName.id = `${side === Side.WHITE ? 'white' : 'black'}PlayerName`;
    playerName.innerText = name;
    return playerName;
};
