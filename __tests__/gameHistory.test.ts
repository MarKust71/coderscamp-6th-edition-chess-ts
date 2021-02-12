import { GameHistory, Movement } from '../src/app/gameHistory/gameHistory';
import { runTimer } from '../src/app/timers/runTimer';
import { Pawn } from '../src/app/pieces/pawn';
import { chessBoard } from '../src/app/board/chessBoard';
import { Side } from '../src/app/types';

// import { LocalStorageMock } from './mocks/localStorageMock';

test('Saving basic information.', () => {
    // global.localStorage = new LocalStorageMock();
    localStorage.setItem('history', '[]');
    const whitePawn = new Pawn({ x: 6, y: 3 }, Side.WHITE);
    const blackPawn = new Pawn({ x: 1, y: 5 }, Side.BLACK);

    GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 4, y: 3 }, runTimer.timers));
    GameHistory.newMove(new Movement(blackPawn, blackPawn.coordinates, { x: 3, y: 5 }, runTimer.timers));
    GameHistory.newMove(new Movement(whitePawn, { x: 4, y: 3 }, { x: 3, y: 3 }, runTimer.timers));

    expect(GameHistory.getHistory()).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                origin: { x: 6, y: 3 },
                notation: 'd4',
            }),
            expect.objectContaining({
                origin: { x: 1, y: 5 },
                notation: 'f5',
            }),
            expect.objectContaining({
                origin: { x: 4, y: 3 },
                notation: 'd5',
            }),
        ]),
    );
});

describe('Testing Pawn.', () => {
    test('Pawn move.', () => {
        // global.localStorage = new LocalStorageMock();
        localStorage.setItem('history', '[]');
        const whitePawn = new Pawn({ x: 6, y: 3 }, Side.WHITE);

        GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 4, y: 3 }, runTimer.timers));

        expect(GameHistory.getHistory()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    origin: { x: 6, y: 3 },
                    notation: 'd4',
                }),
            ]),
        );
    });

    test('Pawn capture', () => {
        // global.localStorage = new LocalStorageMock();
        localStorage.setItem('history', '[]');
        const whitePawn = new Pawn({ x: 5, y: 3 }, Side.WHITE);
        chessBoard.board[whitePawn.coordinates.x][whitePawn.coordinates.y].pieceOnSquare = whitePawn;
        const blackPawn = new Pawn({ x: 4, y: 4 }, Side.BLACK);
        chessBoard.board[blackPawn.coordinates.x][blackPawn.coordinates.y].pieceOnSquare = blackPawn;

        GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 4, y: 4 }, runTimer.timers));

        expect(GameHistory.getHistory()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    origin: { x: 5, y: 3 },
                    notation: 'd:e4',
                }),
            ]),
        );
    });
});
