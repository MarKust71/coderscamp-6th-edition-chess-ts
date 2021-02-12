import { chessBoard } from '../app/board/chessBoard';

import { touched } from './touched';
import { gameplaySidebar } from './gameplaySidebar';
import { paintBoard } from './boardView/paintBoard';
import { paintPieces } from './boardView/paintPieces';

export const setup = (): void => {
    const wrapper = document.getElementById('wrapper');
    document.getElementById('board') && wrapper.removeChild(document.getElementById('board'));
    document.getElementById('gameplaySidebar') && wrapper.removeChild(document.getElementById('gameplaySidebar'));
    const board = document.createElement('div');
    board.id = 'board';
    wrapper.appendChild(board);

    paintBoard(touched, chessBoard);
    paintPieces(chessBoard.board);
    gameplaySidebar();
    localStorage.setItem('history', '[]');
};
