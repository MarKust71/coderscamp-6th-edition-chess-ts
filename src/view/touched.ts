import { chessBoard } from '../app/board/chessBoard';
import { GameHistory } from '../app/gameHistory/gameHistory';

import { unmarkLegalMoves } from './boardView/unmarkLegalMoves';
import { markLegalMoves } from './boardView/markLegalMoves';

export const touched = ({ currentTarget }: MouseEvent): void => {
    if (!(currentTarget instanceof HTMLElement)) return;
    const { id, classList } = currentTarget;
    const { x, y } = JSON.parse(id);
    const piece = chessBoard.board[x][y].pieceOnSquare;

    if (classList.contains('possibleMove')) {
        chessBoard.moveEvent(currentTarget as HTMLElement);
        unmarkLegalMoves(chessBoard.board);
    } else if (piece && piece.side === GameHistory.whoseTurn()) {
        unmarkLegalMoves(chessBoard.board);
        markLegalMoves(chessBoard.board[x][y].pieceOnSquare.findLegalMoves(), { x, y });
    }
};
