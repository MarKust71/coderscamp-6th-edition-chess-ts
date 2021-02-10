import { GameHistory } from '../app/gameHistory/gameHistory';
import { ChessBoard } from '../app/board/board';

import { setup } from './setup';

export const winnerDialogBox = () => {
    const wrapper = document.createElement('div');
    const dialogBox = document.createElement('div');
    const message = document.createElement('p');
    const newGameButton = document.createElement('button');

    dialogBox.append(message);
    dialogBox.append(newGameButton);
    wrapper.append(dialogBox);

    dialogBox.classList.add('checkmate-box');
    newGameButton.classList.add('startGameButton');
    wrapper.classList.add('checkmate-box-wrapper');

    message.textContent = `${GameHistory.getHistory()[GameHistory.getHistory().length - 1].piece.side} is a winner!`;
    newGameButton.textContent = 'New game';
    newGameButton.addEventListener('click', newGame);

    document.getElementById('wrapper').append(wrapper);

    function newGame() {
        const newBoard = document.createElement('div');
        const gameWrapper = document.getElementById('wrapper');
        newBoard.setAttribute('id', 'board');
        gameWrapper.innerHTML = '';
        gameWrapper.append(newBoard);

        GameHistory.setHistory([]);
        ChessBoard.boardSetup();
        setup();
    }
};

export default winnerDialogBox;
