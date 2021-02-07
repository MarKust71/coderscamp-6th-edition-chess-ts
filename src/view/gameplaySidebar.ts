import { setupTimerTime } from '../app/timers/setupTimerTime';

import { timer } from './startSetupBox';

// type TimerViewParams = {
//     id: string;
//     clockTimer: number;
// };

export type UpdatePlayerTimerParams = {
    id: string;
    time: number;
};

// const timerView = ({ id, clockTimer }: TimerViewParams) => {
//     const blackPlayerTimerContainer = document.createElement('div');
//     const blackPlayerTimer = document.createElement('div');
//     blackPlayerTimerContainer.className = `${id}Container`;
//     blackPlayerTimer.className = `${id}`;
//     blackPlayerTimer.id = `${id}`;
//     blackPlayerTimerContainer.appendChild(blackPlayerTimer);
//     updatePlayerTimer({ id: id, time: clockTimer });
//     // gameplaySidebar.appendChild(blackPlayerTimerContainer);
// };

// const historyView = () => {
//     const gameHistoryRecording = document.createElement('div');
//     const recordingListMoves = document.createElement('ol');
//     const recordingMovesHistory = document.createTextNode('history');
//     gameHistoryRecording.className = 'gameHistoryRecording';
//     recordingListMoves.className = 'recordingListMoves';
//     recordingListMoves.appendChild(recordingMovesHistory);
//     gameHistoryRecording.appendChild(recordingListMoves);
//     gameplaySidebar.appendChild(gameHistoryRecording);
// };

setupTimerTime(timer.clockTimer);

export const gameplaySidebar = (): void => {
    const wrapper = document.getElementById('wrapper');
    const gameplaySidebar = document.createElement('div');
    gameplaySidebar.id = 'gameplaySidebar';
    wrapper.appendChild(gameplaySidebar);
    // timerView({ id: 'blackPlayerTimer', clockTimer: timer.clockTimer });
    const blackPlayerTimerContainer = document.createElement('div');
    const blackPlayerTimer = document.createElement('div');
    blackPlayerTimerContainer.className = 'blackPlayerTimerContainer';
    blackPlayerTimer.className = 'blackPlayerTimer';
    blackPlayerTimer.id = 'blackPlayerTimer';
    blackPlayerTimerContainer.appendChild(blackPlayerTimer);
    gameplaySidebar.appendChild(blackPlayerTimerContainer);
    updatePlayerTimer({ id: 'blackPlayerTimer', time: timer.clockTimer });
    // historyView();
    const gameHistoryRecording = document.createElement('div');
    const recordingListMoves = document.createElement('ol');
    const recordingMovesHistory = document.createTextNode('history');
    gameHistoryRecording.className = 'gameHistoryRecording';
    recordingListMoves.className = 'recordingListMoves';
    recordingListMoves.appendChild(recordingMovesHistory);
    gameHistoryRecording.appendChild(recordingListMoves);
    gameplaySidebar.appendChild(gameHistoryRecording);
    // timerView({ id: 'whitePlayerTimer', clockTimer: timer.clockTimer });
    const whitePlayerTimerContainer = document.createElement('div');
    const whitePlayerTimer = document.createElement('div');
    whitePlayerTimerContainer.className = 'whitePlayerTimerContainer';
    whitePlayerTimer.className = 'whitePlayerTimer';
    whitePlayerTimer.id = 'whitePlayerTimer';
    whitePlayerTimerContainer.appendChild(whitePlayerTimer);
    gameplaySidebar.appendChild(whitePlayerTimerContainer);
    updatePlayerTimer({ id: 'whitePlayerTimer', time: timer.clockTimer });
};

export const updatePlayerTimer = ({ id, time }: UpdatePlayerTimerParams): void => {
    document.getElementById(id).innerHTML = setupTimerTime(time);
};
