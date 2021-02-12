import { Name } from '../../app/types';
import { Bishop } from '../../app/pieces/bishop';
import { Queen } from '../../app/pieces/queen';
import { Knight } from '../../app/pieces/knight';
import { Rook } from '../../app/pieces/rook';
import { chessBoard } from '../../app/board/chessBoard';
import { GameHistory } from '../../app/gameHistory/gameHistory';

import { SwitchPieces } from './types';

export const switchPieces = ({ id, coordinates, side, promoCover, promotionWindow }: SwitchPieces) => {
    // const { currentTarget } = event;
    const { x, y } = coordinates;
    let newPiece;
    // const { id } = currentTarget as HTMLAreaElement;
    switch (id) {
        case Name.BISHOP:
            newPiece = new Bishop({ x: x, y: y }, side);
            break;
        case Name.QUEEN:
            newPiece = new Queen({ x: x, y: y }, side);
            break;
        case Name.KNIGHT:
            newPiece = new Knight({ x: x, y: y }, side);
            break;
        case Name.ROOK:
            newPiece = new Rook({ x: x, y: y }, side);
            break;
        default:
            break;
    }
    chessBoard.board[x][y].pieceOnSquare = newPiece;
    document.querySelector(`[id='{"x":${x},"y":${y}}']`).innerHTML = newPiece.display;
    const wrapper = document.getElementById('wrapper');
    wrapper.removeChild(promotionWindow);
    wrapper.removeChild(promoCover);
    GameHistory.promotion(newPiece.name);
};
