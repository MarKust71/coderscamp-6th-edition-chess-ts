export interface UpdatePlayerNamesParams {
    whitePlayerName: string;
    blackPlayerName: string;
}

export const updatePlayerNames = ({ whitePlayerName, blackPlayerName }: UpdatePlayerNamesParams) => {
    document.getElementById('whitePlayerName').innerText = whitePlayerName;
    document.getElementById('blackPlayerName').innerText = blackPlayerName;
};
