import { chessBoard } from '../../app/board/chessBoard';
import { GameHistory } from '../../app/gameHistory/gameHistory';
import { createByName } from '../../app/pieces/createByName';

import { SwitchPieces } from './types';

export const switchPieces = ({ id, coordinates, side, promoCover, promotionWindow }: SwitchPieces) => {
    const { x, y } = coordinates;
    const newPiece = createByName(id, side, coordinates);
    chessBoard.board[x][y].pieceOnSquare = newPiece;
    document.querySelector(`[id='{"x":${x},"y":${y}}']`).innerHTML = newPiece.display;
    const wrapper = document.getElementById('wrapper');
    wrapper.removeChild(promotionWindow);
    wrapper.removeChild(promoCover);
    GameHistory.promotion(newPiece.name);
};
