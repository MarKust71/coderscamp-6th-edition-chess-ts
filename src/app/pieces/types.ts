import { Coordinates, Name, Side } from '../types';

export interface PieceModel {
    coordinates: Coordinates;
    side: Side;
    name: Name;
    move: (coordinates: Coordinates) => void;
    findLegalMoves(): void;
    promote?(): void;
    checkKingIsSafe(expectedCoordiates: Coordinates): boolean;
}

export type getMovesRelatedToPiecePositionParams = {
    origin: Coordinates;
    side: Side;
    moves: Coordinates[];
    checkKingIsSafe(expectedCoordiates: Coordinates): boolean;
};

export type CheckKingIsSafeParams = Coordinates;
