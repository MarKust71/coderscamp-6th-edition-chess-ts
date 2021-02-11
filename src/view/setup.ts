import { touched } from '../app/touched';
import { chessBoard } from '../app/board/board';

import { gameplaySidebar } from './gameplaySidebar';

export const setup = (): void => {
    const wrapper = document.getElementById('wrapper');
    document.getElementById('board') && wrapper.removeChild(document.getElementById('board'));
    document.getElementById('gameplaySidebar') && wrapper.removeChild(document.getElementById('gameplaySidebar'));
    const board = document.createElement('div');
    board.id = 'board';
    wrapper.appendChild(board);

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
    gameplaySidebar();
    localStorage.setItem('history', '[]');
};
