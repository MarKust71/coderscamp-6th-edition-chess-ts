import { GameHistory, Movement } from '../src/app/gameHistory/gameHistory';
import { Timer } from '../src/app/timers/timers';
import { Pawn } from '../src/app/pieces/pawn';
import { King } from '../src/app/pieces/king';
//import { Rook } from '../src/app/pieces/rook';
import { chessBoard } from '../src/app/board/board';
import { Side } from '../src/app/types';

import { LocalStorageMock } from './localStorageMock';

test('King construction with correct input.', () => {
    const defaultWhiteKing = new King({ x: -1, y: -1 }, Side.WHITE);
    const whiteKing = new King({ x: 3, y: 4 }, Side.WHITE);
    const defaultBlackKing = new King({ x: -1, y: -1 }, Side.BLACK);
    const blackKing = new King({ x: 3, y: 4 }, Side.BLACK);

    expect(defaultWhiteKing).toEqual(
        expect.objectContaining({
            coordinates: { x: 7, y: 4 },
            name: 'king',
            side: 'white',
        }),
    );

    expect(whiteKing).toEqual(
        expect.objectContaining({
            coordinates: { x: 3, y: 4 },
            name: 'king',
            side: 'white',
        }),
    );

    expect(defaultBlackKing).toEqual(
        expect.objectContaining({
            coordinates: { x: 0, y: 4 },
            name: 'king',
            side: 'black',
        }),
    );

    expect(blackKing).toEqual(
        expect.objectContaining({
            coordinates: { x: 3, y: 4 },
            name: 'king',
            side: 'black',
        }),
    );
});

test('On edge legal moves detection.', () => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('history', '[]');

    const kingInCorner = new King({ x: 0, y: 0 }, Side.WHITE);
    const kingOnLeftEdge = new King({ x: 4, y: 0 }, Side.WHITE);
    const kingOnTopEdge = new King({ x: 0, y: 4 }, Side.WHITE);
    const kingOnRightEdge = new King({ x: 4, y: 7 }, Side.WHITE);
    const kingOnBottomEdge = new King({ x: 7, y: 4 }, Side.WHITE);

    chessBoard.clearPieces();
    chessBoard.board[kingInCorner.coordinates.x][kingInCorner.coordinates.y].pieceOnSquare = kingInCorner;
    chessBoard.board[kingOnLeftEdge.coordinates.x][kingOnLeftEdge.coordinates.y].pieceOnSquare = kingOnLeftEdge;
    chessBoard.board[kingOnTopEdge.coordinates.x][kingOnTopEdge.coordinates.y].pieceOnSquare = kingOnTopEdge;
    chessBoard.board[kingOnRightEdge.coordinates.x][kingOnRightEdge.coordinates.y].pieceOnSquare = kingOnRightEdge;
    chessBoard.board[kingOnBottomEdge.coordinates.x][kingOnBottomEdge.coordinates.y].pieceOnSquare = kingOnBottomEdge;

    expect(kingInCorner.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
        ]),
    );
    expect(kingOnLeftEdge.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 3, y: 0 },
            { x: 5, y: 0 },
            { x: 3, y: 1 },
            { x: 5, y: 1 },
            { x: 4, y: 1 },
        ]),
    );
    expect(kingOnTopEdge.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 0, y: 3 },
            { x: 0, y: 5 },
            { x: 1, y: 3 },
            { x: 1, y: 4 },
            { x: 1, y: 5 },
        ]),
    );
    expect(kingOnRightEdge.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 3, y: 7 },
            { x: 5, y: 7 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 3, y: 6 },
        ]),
    );
    expect(kingOnBottomEdge.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 7, y: 3 },
            { x: 7, y: 5 },
            { x: 6, y: 3 },
            { x: 6, y: 4 },
            { x: 6, y: 5 },
        ]),
    );
});

/*
test('Same side pieces blocks legal moves.', () => {
    const board = new Array(8);
    for (let i = 0; i < 8; i++) {
        board[i] = new Array(8);
    }

    const chessBoard;

    const kingOne = new King({ x: 3, y: 3 }, Side.WHITE);
    const kingTwo = new King({ x: 4, y: 3 }, Side.WHITE);
    const pawnOne = new Pawn({ x: 2, y: 3 }, Side.WHITE);
    board[3][3] = kingOne;
    board[4][3] = kingTwo;
    board[2][3] = pawnOne;

    expect(kingOne.findLegalMoves()).toEqual(
        expect.not.arrayContaining([
            { x: 4, y: 3 },
            { x: 2, y: 3 },
        ]),
    );
});
*/
/*
test('Allows attacking opponents pieces.', () => {
    const board = new Array(8);
    for (let i = 0; i < 8; i++) {
        board[i] = new Array(8);
    }

    const king = new King(3, 3, 'white');
    const pawnOne = new Pawn(3, 4, 'black');
    const pawnTwo = new Pawn(3, 2, 'black');

    board[3][3] = king;
    board[3][4] = pawnOne;
    board[3][2] = pawnTwo;

    expect(kingOne.findLegalMoves()).toEqual(
        expect.not.arrayContaining([
            { x: 3, y: 4 },
            { x: 3, y: 2 },
        ]),
    );
});

test("Don't allow moving on squares and attacking pieces that are backed by enemy.", () => {
    const board = new Array(8);
    for (let i = 0; i < 8; i++) {
        board[i] = new Array(8);
    }

    const king = new King(3, 3, 'white');
    const pawnOne = new Pawn(3, 2, 'black');
    const pawnTwo = new Pawn(2, 1, 'black');
    const rook = new Rook(0, 4, 'black');

    board[3][3] = king;
    board[3][2] = pawnOne;
    board[2][1] = pawnTwo;
    board[0][4] = rook;

    expect(king.findLegalMoves()).toEqual(
        except.not.arrayContaining([
            { x: 3, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 4 },
            { x: 4, y: 4 },
        ]),
    );
});
*/

//test("Detects if is under the check.",()=>{})

//test("Making castle.",()=>{})

//test("Detects stale.",()=>{})
