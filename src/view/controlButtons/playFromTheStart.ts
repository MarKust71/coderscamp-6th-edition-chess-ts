import { MOVE_INTERVAL } from '../../app/globals';
export function playFromTheStart(listener: (event: MouseEvent, interval: number) => void): HTMLElement {
    const button = document.createElement('span');

    button.classList.add('options__fromStart', 'button');
    button.addEventListener('click', (event) => {
        listener(event, MOVE_INTERVAL);
    });
    button.textContent = 'Restore';
    return button;
}
