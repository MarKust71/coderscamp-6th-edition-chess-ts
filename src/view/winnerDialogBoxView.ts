import { GameHistory } from '../app/gameHistory/gameHistory';
import { chessBoard, ChessBoard } from '../app/board/chessBoard';
import { runTimer } from '../app/timers/runTimer';

import { setup } from './setup';
import { timer } from './startSetupBox';

export const winnerDialogBox = () => {
    runTimer.clearAllIntervals();
    const wrapper = document.getElementById('wrapper');

    const endGameCover = document.createElement('div');
    endGameCover.className = 'endGameCover';
    wrapper.appendChild(endGameCover);

    const message = document.createElement('p');
    const newGameButton = document.createElement('button');
    const dialogBox = document.createElement('div');

    if (GameHistory.getHistory().length) {
        if (GameHistory.getHistory()[GameHistory.getHistory().length - 1].piece.side === 'white') {
            message.textContent = `${document.getElementById('whitePlayerName').innerText} is a winner!`;
        } else {
            message.textContent = `${document.getElementById('blackPlayerName').innerText} is a winner!`;
        }
    } else {
        message.textContent = 'No winner!';
    }

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
        timer();
        setup();
    }
};

export default winnerDialogBox;
