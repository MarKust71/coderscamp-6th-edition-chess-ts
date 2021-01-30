import { touched } from './touched';
import { board } from './board/board';

export const setup = (): void => {
    for (let row = 0; row < board.board.length; row++) {
        for (let column = 0; column < board.board[row].length; column++) {
            const square = document.createElement('div');
            square.id = `${row},${column}`;
            square.innerHTML = board.board[row][column].pieceOnSquare
                ? board.board[row][column].pieceOnSquare.display
                : '';
            square.className = 'square';
            square.className += row % 2 === column % 2 ? ' light' : ' dark';
            square.addEventListener('click', touched);
            document.getElementById('board').appendChild(square);
        }
    }
};
