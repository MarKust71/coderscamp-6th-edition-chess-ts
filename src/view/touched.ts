import { chessBoard } from '../app/board/chessBoard';
import { GameHistory } from '../app/gameHistory/gameHistory';

import { unmarkLegalMoves, markLegalMoves } from './boardView';

export const touched = ({ currentTarget }: MouseEvent): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { id }: any = currentTarget;
    const { x, y } = JSON.parse(id);
    const piece = chessBoard.board[x][y].pieceOnSquare;

    if (!piece || piece.side !== GameHistory.whoseTurn()) return;

    unmarkLegalMoves(chessBoard.board, touched);
    markLegalMoves(chessBoard.board[x][y].pieceOnSquare.findLegalMoves(), { x, y });
};
