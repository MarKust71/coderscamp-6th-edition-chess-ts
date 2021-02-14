export const updatePlayerNames = () => {
    const white = document.getElementById('whitePlayerNameInput') as HTMLInputElement;
    document.getElementById('whitePlayerName').innerText = white.value;

    const black = document.getElementById('blackPlayerNameInput') as HTMLInputElement;
    document.getElementById('blackPlayerName').innerText = black.value;
};
