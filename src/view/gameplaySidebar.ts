// import { timer } from './startSetupBox';
//
// export const setupTimerTime = (clockTimer) => {
//     let timeLeft;
//     let minutes = Math.floor(clockTimer / 60);
//     let seconds = clockTimer % 60;
//     seconds >= 10 ? (timeLeft = `0${minutes}:${seconds}`) : (timeLeft = `0${minutes}:0${seconds}`);
//     return timeLeft;
// };
//
// export const gameplaySidebar = () => {
//     const wrapper = document.getElementById('wrapper');
//     const gameplaySidebar = document.createElement('div');
//     gameplaySidebar.id = 'gameplaySidebar';
//     wrapper.appendChild(gameplaySidebar);
//
//     const blackPlayerTimerContainer = document.createElement('div');
//     const blackPlayerTimer = document.createElement('div');
//     blackPlayerTimerContainer.className = 'blackPlayerTimerContainer';
//     blackPlayerTimer.className = 'blackPlayerTimer';
//     blackPlayerTimer.id = 'blackPlayerTimer';
//     updatePlayerTimer(blackPlayerTimer, timer.clockTimer);
//     blackPlayerTimerContainer.appendChild(blackPlayerTimer);
//     gameplaySidebar.appendChild(blackPlayerTimerContainer);
//
//     const gameHistoryRecording = document.createElement('div');
//     const recordingListMoves = document.createElement('ol');
//     const recordingMovesHistory = document.createTextNode('history');
//     gameHistoryRecording.className = 'gameHistoryRecording';
//     recordingListMoves.className = 'recordingListMoves';
//     recordingListMoves.appendChild(recordingMovesHistory);
//     gameHistoryRecording.appendChild(recordingListMoves);
//     gameplaySidebar.appendChild(gameHistoryRecording);
//
//     const whitePlayerTimerContainer = document.createElement('div');
//     const whitePlayerTimer = document.createElement('div');
//     whitePlayerTimerContainer.className = 'whitePlayerTimerContainer';
//     whitePlayerTimer.className = 'whitePlayerTimer';
//     whitePlayerTimer.id = 'whitePlayerTimer';
//     updatePlayerTimer(whitePlayerTimer, timer.clockTimer);
//     whitePlayerTimerContainer.appendChild(whitePlayerTimer);
//     gameplaySidebar.appendChild(whitePlayerTimerContainer);
// };
//
// export const updatePlayerTimer = (playerTimer, time) => {
//     playerTimer.innerHTML = setupTimerTime(time);
// };
