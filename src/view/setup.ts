import { touched } from '../app/touched';
import { chessBoard } from '../app/board/board';
import { runTimer } from '../app/timers/runTimer';

import { gameplaySidebar } from './gameplaySidebar';
import { paintBoard, paintPieces } from './boardView';

export const setup = (): void => {
    paintBoard(touched);
    paintPieces(chessBoard.board);
    runTimer.clearAllIntervals();
    gameplaySidebar();
    localStorage.setItem('history', '[]');
};
