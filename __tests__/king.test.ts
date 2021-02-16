import { chessBoard } from '../src/app/board/chessBoard';
import { Pawn } from '../src/app/pieces/pawn';
import { King } from '../src/app/pieces/king';
import { Side } from '../src/app/types';

import { LocalStorageMock } from './mocks/localStorageMock';

global.localStorage = new LocalStorageMock();
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

test('Same side pieces blocks legal moves.', () => {
    localStorage.setItem('history', '[]');

    const king = new King({ x: 4, y: 4 }, Side.WHITE);
    const pawn1 = new Pawn({ x: 4, y: 5 }, Side.WHITE);
    const pawn2 = new Pawn({ x: 4, y: 3 }, Side.WHITE);
    const pawn3 = new Pawn({ x: 5, y: 5 }, Side.WHITE);

    chessBoard.clearPieces();
    chessBoard.board[king.coordinates.x][king.coordinates.y].pieceOnSquare = king;
    chessBoard.board[pawn1.coordinates.x][pawn1.coordinates.y].pieceOnSquare = pawn1;
    chessBoard.board[pawn2.coordinates.x][pawn2.coordinates.y].pieceOnSquare = pawn2;
    chessBoard.board[pawn3.coordinates.x][pawn3.coordinates.y].pieceOnSquare = pawn3;

    expect(king.findLegalMoves()).toEqual(
        expect.not.arrayContaining([
            { x: 4, y: 5 },
            { x: 4, y: 3 },
            { x: 5, y: 5 },
        ]),
    );
});

test('Allows attacking opponents pieces.', () => {
    localStorage.setItem('history', '[]');

    const king = new King({ x: 4, y: 4 }, Side.WHITE);
    const pawn1 = new Pawn({ x: 4, y: 5 }, Side.BLACK);
    const pawn2 = new Pawn({ x: 4, y: 3 }, Side.BLACK);
    const pawn3 = new Pawn({ x: 5, y: 5 }, Side.WHITE);

    chessBoard.clearPieces();
    chessBoard.board[king.coordinates.x][king.coordinates.y].pieceOnSquare = king;
    chessBoard.board[pawn1.coordinates.x][pawn1.coordinates.y].pieceOnSquare = pawn1;
    chessBoard.board[pawn2.coordinates.x][pawn2.coordinates.y].pieceOnSquare = pawn2;
    chessBoard.board[pawn3.coordinates.x][pawn3.coordinates.y].pieceOnSquare = pawn3;

    expect(king.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 4, y: 5 },
            { x: 4, y: 3 },
        ]),
    );
});

test("Don't allow moving on squares and attacking pieces that are backed by enemy.", () => {
    localStorage.setItem('history', '[]');

    const king = new King({ x: 4, y: 4 }, Side.WHITE);
    const pawn1 = new Pawn({ x: 3, y: 4 }, Side.BLACK);
    const pawn2 = new Pawn({ x: 2, y: 3 }, Side.BLACK);
    const pawn3 = new Pawn({ x: 2, y: 6 }, Side.BLACK);

    chessBoard.clearPieces();
    chessBoard.board[king.coordinates.x][king.coordinates.y].pieceOnSquare = king;
    chessBoard.board[pawn1.coordinates.x][pawn1.coordinates.y].pieceOnSquare = pawn1;
    chessBoard.board[pawn2.coordinates.x][pawn2.coordinates.y].pieceOnSquare = pawn2;
    chessBoard.board[pawn3.coordinates.x][pawn3.coordinates.y].pieceOnSquare = pawn3;

    expect(king.findLegalMoves()).toEqual(
        expect.arrayContaining([
            { x: 3, y: 3 },
            { x: 5, y: 4 },
            { x: 5, y: 3 },
            { x: 5, y: 5 },
        ]),
    );
});

test('Detects if is under the check.', () => {
    localStorage.setItem('history', '[]');

    const kingWhite = new King({ x: 4, y: 4 }, Side.WHITE);
    const kingBlack = new King({ x: 0, y: 0 }, Side.BLACK);
    const pawn1 = new Pawn({ x: 3, y: 3 }, Side.BLACK);
    const pawn2 = new Pawn({ x: 2, y: 3 }, Side.BLACK);
    const pawn3 = new Pawn({ x: 2, y: 6 }, Side.BLACK);

    chessBoard.clearPieces();
    chessBoard.board[kingWhite.coordinates.x][kingWhite.coordinates.y].pieceOnSquare = kingWhite;
    chessBoard.board[kingBlack.coordinates.x][kingBlack.coordinates.y].pieceOnSquare = kingBlack;
    chessBoard.board[pawn1.coordinates.x][pawn1.coordinates.y].pieceOnSquare = pawn1;
    chessBoard.board[pawn2.coordinates.x][pawn2.coordinates.y].pieceOnSquare = pawn2;
    chessBoard.board[pawn3.coordinates.x][pawn3.coordinates.y].pieceOnSquare = pawn3;

    expect(kingWhite.underCheck()).toEqual(true);
    expect(kingBlack.underCheck()).toEqual(false);
});
