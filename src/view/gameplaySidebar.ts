import { setupTimerTime } from '../app/timers/setupTimerTime';

import { timer } from './startSetupBox';
import { timerView } from './timerView';

export type UpdatePlayerTimerParams = {
    id: string;
    time: number;
};

setupTimerTime(timer.clockTimer);

export const gameplaySidebar = (): void => {
    const wrapper = document.getElementById('wrapper');

    const gameplaySidebar = document.createElement('div');
    gameplaySidebar.id = 'gameplaySidebar';
    wrapper.appendChild(gameplaySidebar);

    const recordingMovesHistory = document.createTextNode('Title');
    const recordingListMoves = document.createElement('ol');
    recordingListMoves.className = 'recordingListMoves';
    recordingListMoves.appendChild(recordingMovesHistory);
    const gameHistoryRecording = document.createElement('div');
    gameHistoryRecording.className = 'gameHistoryRecording';
    gameHistoryRecording.appendChild(recordingListMoves);

    gameplaySidebar.appendChild(timerView({ id: 'blackPlayerTimer' }));
    gameplaySidebar.appendChild(gameHistoryRecording);
    gameplaySidebar.appendChild(timerView({ id: 'whitePlayerTimer' }));

    updatePlayerTimer({ id: 'blackPlayerTimer', time: timer.clockTimer });
    updatePlayerTimer({ id: 'whitePlayerTimer', time: timer.clockTimer });
};

export const updatePlayerTimer = ({ id, time }: UpdatePlayerTimerParams): void => {
    document.getElementById(id).innerHTML = setupTimerTime(time);
};
