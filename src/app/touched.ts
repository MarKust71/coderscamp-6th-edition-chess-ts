import { board } from './board/board';

export const touched = (event: MouseEvent): void => {
    const { id } = event.currentTarget as HTMLAreaElement;
    const x: number = parseInt(id[0]);
    const y: number = parseInt(id[2]);

    if (!board.board[x][y].pieceOnSquare) {
        return;
    }

    board.unmarkLegalMoves();
    board.markLegalMoves(board.board[x][y].pieceOnSquare.findLegalMoves(), { x: x, y: y });
};
