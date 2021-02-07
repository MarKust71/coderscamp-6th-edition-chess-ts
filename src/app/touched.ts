import { chessBoard } from './board/board';
import { GameHistory } from './gameHistory/gameHistory';

export const touched = (event: MouseEvent): void => {
    const { id } = event.currentTarget as HTMLAreaElement;
    const { x, y } = JSON.parse(id);
    const piece = chessBoard.board[x][y].pieceOnSquare;

    if (!piece) {
        return;
    }
    if (piece.side !== GameHistory.whoseTurn()) return;

    chessBoard.unmarkLegalMoves();
    chessBoard.markLegalMoves(chessBoard.board[x][y].pieceOnSquare.findLegalMoves(), { x, y });
};
