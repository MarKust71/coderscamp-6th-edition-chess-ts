import { GameHistory, Movement } from '../src/app/gameHistory/gameHistory';
import { Timer } from '../src/app/timers/timers';
import { Pawn } from '../src/app/pieces/pawn';
import { chessBoard } from '../src/app/board/board';
import { Side } from '../src/app/types';

import { LocalStorageMock } from './localStorageMock';

test('Saving basic information.', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('history', '[]');
    const whitePawn = new Pawn({ x: 6, y: 3 }, Side.WHITE);
    const blackPawn = new Pawn({ x: 1, y: 5 }, Side.BLACK);

    GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 4, y: 3 }, [new Timer(), new Timer()]));
    GameHistory.newMove(new Movement(blackPawn, blackPawn.coordinates, { x: 3, y: 5 }, [new Timer(), new Timer()]));
    GameHistory.newMove(new Movement(whitePawn, { x: 4, y: 3 }, { x: 3, y: 3 }, [new Timer(), new Timer()]));

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

describe('Testing pieces notation', () => {
    test('King', () => {});
    test('Queen', () => {});
    test('Knight', () => {});
    test('Bishop', () => {});
    test('Rook', () => {});
});

describe('Testing Pawn.', () => {
    test('Pawn move.', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.setItem('history', '[]');
        const whitePawn = new Pawn({ x: 6, y: 3 }, Side.WHITE);

        GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 4, y: 3 }, [new Timer(), new Timer()]));

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
        global.localStorage = new LocalStorageMock();
        localStorage.setItem('history', '[]');
        const whitePawn = new Pawn({ x: 5, y: 3 }, Side.WHITE);
        chessBoard.board[whitePawn.coordinates.x][whitePawn.coordinates.y].pieceOnSquare = whitePawn;
        const blackPawn = new Pawn({ x: 4, y: 4 }, Side.BLACK);
        chessBoard.board[blackPawn.coordinates.x][blackPawn.coordinates.y].pieceOnSquare = blackPawn;

        GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 4, y: 4 }, [new Timer(), new Timer()]));

        expect(GameHistory.getHistory()).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    origin: { x: 5, y: 3 },
                    notation: 'd:e4',
                }),
            ]),
        );
    });

    test('Pawn promotion', () => {});
    test('En passant', () => {
        global.localStorage = new LocalStorageMock();
        localStorage.setItem('history', '[]');

        const whitePawn = new Pawn({ x: 3, y: 3 }, Side.WHITE);
        chessBoard.board[whitePawn.coordinates.x][whitePawn.coordinates.y].pieceOnSquare = whitePawn;
        const blackPawn = new Pawn({ x: 1, y: 2 }, Side.BLACK);
        chessBoard.board[blackPawn.coordinates.x][blackPawn.coordinates.y].pieceOnSquare = blackPawn;

        blackPawn.coordinates = { x: 3, y: 2 };
        GameHistory.newMove(new Movement(blackPawn, { x: 1, y: 2 }, blackPawn.coordinates, [new Timer(), new Timer()]));
        chessBoard.board[blackPawn.coordinates.x][blackPawn.coordinates.y].pieceOnSquare = undefined;
        chessBoard.board[3][2].pieceOnSquare = blackPawn;

        GameHistory.newMove(new Movement(whitePawn, whitePawn.coordinates, { x: 2, y: 2 }, [new Timer(), new Timer()]));

        expect(GameHistory.lastMove()).toEqual(
            expect.objectContaining({
                origin: { x: 3, y: 3 },
                notation: 'd:c6(e.p.)',
            }),
        );
    });
});

test('Castle notation', () => {});
test('Check notation', () => {});
test('Mate notation', () => {});
test('Stalemate notation', () => {});
test('Proper notation if two same type pieces can move on the same square', () => {
    //
});
