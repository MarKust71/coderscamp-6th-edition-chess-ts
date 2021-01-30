import { chessBoard } from './board/board';

export const touched = (event: MouseEvent): void => {
    const { id } = event.currentTarget as HTMLAreaElement;
    const { x, y } = JSON.parse(id);

    if (!chessBoard.board[x][y].pieceOnSquare) {
        return;
    }

    chessBoard.unmarkLegalMoves();
    chessBoard.markLegalMoves(chessBoard.board[x][y].pieceOnSquare.findLegalMoves(), { x, y });
};
