import { touched } from '../app/touched';
import { chessBoard } from '../app/board/board';

export const setup = (): void => {
    for (let row = 0; row < chessBoard.board.length; row++) {
        for (let column = 0; column < chessBoard.board[row].length; column++) {
            const square = document.createElement('div');
            square.id = JSON.stringify({ x: row, y: column });
            square.innerHTML = chessBoard.board[row][column].pieceOnSquare
                ? chessBoard.board[row][column].pieceOnSquare.display
                : '';
            square.className = 'square';
            square.className += row % 2 === column % 2 ? ' light' : ' dark';
            square.addEventListener('click', touched);
            document.getElementById('board').appendChild(square);
        }
    }
    // gameplaySidebar();
};
