import { GameHistory } from '../app/gameHistory/gameHistory';
import { chessBoard, ChessBoard } from '../app/board/board';
import { runTimer } from '../app/timers/runTimer';

import { setup } from './setup';

export const winnerDialogBox = () => {
    runTimer.clearAllIntervals();
    const wrapper = document.getElementById('wrapper');

    const endGameCover = document.createElement('div');
    endGameCover.className = 'endGameCover';
    wrapper.appendChild(endGameCover);

    const message = document.createElement('p');
    const newGameButton = document.createElement('button');
    const dialogBox = document.createElement('div');

    message.textContent = `${GameHistory.getHistory()[GameHistory.getHistory().length - 1].piece.side} is a winner!`;
    newGameButton.classList.add('startGameButton');
    newGameButton.textContent = 'New game';
    dialogBox.classList.add('endGameBox');

    dialogBox.appendChild(message);
    dialogBox.appendChild(newGameButton);
    wrapper.appendChild(dialogBox);

    newGameButton.addEventListener('click', newGame);

    function newGame() {
        wrapper.removeChild(endGameCover);
        wrapper.removeChild(dialogBox);
        ChessBoard.pieceSetup(chessBoard.board);
        GameHistory.setHistory([]);
        setup();
    }
};

export default winnerDialogBox;
