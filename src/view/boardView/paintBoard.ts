import { ChessBoard } from '../../app/board/chessBoard';

export function paintBoard(touchedListener: (event: MouseEvent) => void, chessBoard: ChessBoard) {
    for (let row = 0; row < chessBoard.board.length; row++) {
        for (let column = 0; column < chessBoard.board[row].length; column++) {
            const square = document.createElement('div');
            square.id = JSON.stringify({ x: row, y: column });
            square.className = 'square';
            square.className += row % 2 === column % 2 ? ' light' : ' dark';
            square.addEventListener('click', touchedListener);
            document.getElementById('board').appendChild(square);
        }
    }
}
