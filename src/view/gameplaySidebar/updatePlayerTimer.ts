import { timerTimeToString } from '../../app/timers/timerTimeToString';

export type UpdatePlayerTimerParams = {
    id: string;
    time: number;
};

export const updatePlayerTimer = ({ id, time }: UpdatePlayerTimerParams): void => {
    document.getElementById(id).innerHTML = timerTimeToString(time);
};
