import { Piece } from '../../app/pieces/piece';

export function addPiece(piece: Piece) {
    document.getElementById(JSON.stringify(piece.coordinates)).innerHTML = piece.display;
}
