export class Movement {
    piece: Piece;
    origin: Coordinates;
    timers: Array<Timer>;
    notation: String;

    constructor(piece: Piece, origin: Coordinates, destination: Coordinates, timers: Array<Timer>) {
        this.piece = piece;
        this.origin = origin;
        this.timers = timers;

        this.notation = Movement.notationStrategy();
    }

    static notationStrategy(): string {
        return '';
    }
}

export class gameHistory {
    history: Array<Movement>;

    constructor() {
        this.history = [];
    }

    whoseTurn(): Side {
        return this.history.length % 2 === 0 ? 'white' : 'black';
    }

    newMove(move: Movement): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        history.push(move);
        localStorage.setItem('history', JSON.stringify(history));
    }

    undoMove(): void {
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));
        const lastMove: Movement = history.pop();

        lastMove.piece.x = lastMove.origin.x;
        lastMove.piece.y = lastMove.origin.y;

        // Repaint on board
    }

    playFromTheStart(): void {
        // Setup board
        const TIME_BETWEEN_MOVES = 600;
        const history: Array<Movement> = JSON.parse(localStorage.getItem('history'));

        for (let i = 0; i < history.length; i++) {
            setTimeout(() => {
                const move: Movement = history.shift();
                const piece: Piece = null; //piece at square x = move.origin.x, y = move.origin.y
                piece.move({ x: move.origin.x, y: move.origin.y });
            }, TIME_BETWEEN_MOVES);
        }
    }
}
