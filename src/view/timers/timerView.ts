import './styles.css';

export type TimerViewParams = {
    id: string;
};

export const timerView = ({ id }: TimerViewParams): HTMLDivElement => {
    const playerTimer = document.createElement('div');
    playerTimer.className = id;
    playerTimer.id = id;
    const playerTimerContainer = document.createElement('div');
    playerTimerContainer.className = `${id}Container`;
    playerTimerContainer.appendChild(playerTimer);
    return playerTimerContainer;
};
