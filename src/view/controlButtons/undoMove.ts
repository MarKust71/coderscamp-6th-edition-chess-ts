export function undoMove(listener: (event: MouseEvent) => void): HTMLElement {
    const button = document.createElement('span');

    button.classList.add('options__undo', 'button');
    button.addEventListener('click', (event) => {
        listener(event);
    });
    button.textContent = 'Undo';
    return button;
}
