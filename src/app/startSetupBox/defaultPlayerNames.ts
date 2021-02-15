import { Side } from '../types';

export const defaultPlayerNames = (side: Side) => {
    return `Player ${side === Side.WHITE ? 'White' : 'Black'}`;
};
