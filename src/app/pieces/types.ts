import { Coordinates, Side } from '../types';

export type getMovesRelatedToPiecePositionParams = {
    origin: Coordinates;
    side: Side;
    moves: Coordinates[];
    checkKingIsSafe: (x: number, y: number) => boolean;
};
