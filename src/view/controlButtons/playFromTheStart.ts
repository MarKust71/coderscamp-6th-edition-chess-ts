import { MOVE_INTERVAL } from '../../app/globals';
export function playFromTheStart(listener: (event: MouseEvent, interval: number) => void): HTMLDivElement {
    const button = document.createElement('div');

    button.classList.add('options__fromStart', 'button');
    button.addEventListener('click', (event) => {
        listener(event, MOVE_INTERVAL);
    });
    button.textContent = 'Odtwórz partię';
    return button;
}
