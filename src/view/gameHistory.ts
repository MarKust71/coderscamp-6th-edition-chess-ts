import { GameHistory } from '../app/gameHistory/gameHistory';

export class GameHistoryView {
    static elementSelector = '.gameHistoryRecording';

    static recreate(): void {
        GameHistoryView.clear();
        for (const move of GameHistory.getHistory()) {
            GameHistoryView.append(move.notation);
        }
    }

    static update(): void {
        const lastMove = GameHistory.lastMove();
        const list = document.querySelector(`${GameHistoryView.elementSelector} .listOfMoves`);
        const newListElement = document.createElement('div');
        newListElement.textContent = lastMove.notation;

        list.append(newListElement);
    }

    static append(notation: string): void {
        const list = document.querySelector(`${GameHistoryView.elementSelector} .listOfMoves`);
        const newListElement = document.createElement('div');
        newListElement.textContent = notation;

        list.append(newListElement);
    }

    static removeLast(): void {
        const list = document.querySelector(`${GameHistoryView.elementSelector} .listOfMoves`);
        list.querySelector('div:last-child').remove();
    }

    static clear(): void {
        document.querySelector(`${GameHistoryView.elementSelector} .listOfMoves`).innerHTML = '';
    }

    static create(): HTMLElement {
        const gameHistoryRecording = document.createElement('div');
        gameHistoryRecording.append(document.createTextNode('History'));
        const listOfMoves = document.createElement('div');
        listOfMoves.className = 'listOfMoves';

        gameHistoryRecording.className = 'gameHistoryRecording';
        gameHistoryRecording.appendChild(listOfMoves);

        return gameHistoryRecording;
    }
}
