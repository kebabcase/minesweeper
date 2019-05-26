import { Board, CellLocation } from '../types';
import { APP, BOARD, CELL } from '../constants';

import { Cell } from '../components/cell/cell.class';

import { getAdjacentLocations, getAdjacentCells } from './cell-utility';

export function determineGameWon(board: Board, total: number): boolean {
  let flaggedCellCounter = 0;
  let discoveredCellCounter = 0;
  let hiddenMineCellCounter = 0;

  board.forEach((row: Cell[]) => {
    row.forEach((cell: Cell) => {
      if (cell.flagged) {
        flaggedCellCounter++;
      }
      if (!cell.hidden) {
        discoveredCellCounter++;
      }

      if (cell.hidden && !cell.flagged && cell.isMine()) {
        hiddenMineCellCounter++;
      }
    });
  });

  return flaggedCellCounter + discoveredCellCounter + hiddenMineCellCounter === total;
}

export function openEmptyCells(targetLocation: CellLocation, board: Board): Board {
  let currentBoard = board;
  const adjacentCells = getAdjacentCells(currentBoard, targetLocation);

  adjacentCells.forEach((adjacentCell: Cell) => {
    if (!adjacentCell.isMine() && !adjacentCell.flagged && adjacentCell.hidden) {
      const adjacentCellLocation = adjacentCell.location;
      currentBoard[adjacentCellLocation.row][adjacentCellLocation.col].hidden = false;

      if (adjacentCell.empty) {
        currentBoard = openEmptyCells(adjacentCellLocation, currentBoard);
      }
    }
  });

  return currentBoard;
}

export function generateBoard(level: APP.LEVEL): Board {
  const { x, y } = BOARD.BOARD_SIZE[level];
  const boardToGenerate: Board = [];

  for (let row = 0; row < y; row++) {
    boardToGenerate.push([]);

    for (let col = 0; col < x; col++) {
      boardToGenerate[row].push(new Cell(row, col));
    }
  }

  return boardToGenerate;
}

export function populateBoard(board: Board, level: APP.LEVEL): Board {
  const minePopulatedBoard = populateMines(board, level);
  return populateMineIndicators(minePopulatedBoard);
}

function populateMines(board: Board, level: APP.LEVEL): Board {
  const numMines = BOARD.NUM_MINES[level];
  const { x, y } = BOARD.BOARD_SIZE[level];

  const chance = level + 1;
  let populatedMineCounter = 0;

  while (populatedMineCounter < numMines) {
    let randRow: number;
    let randCol: number;
    let cell: Cell;

    do {
      randRow = Math.floor(Math.random() * y);
      randCol = Math.floor(Math.random() * x);
      cell = board[randRow][randCol];

      if (!cell.isMine()) {
        cell.type = CELL.CELL_TYPE.MINE;
        populatedMineCounter++;
      }
    } while (!cell.isMine());
  }

  return board;
}

function populateMineIndicators(board: Board): Board {
  board.forEach((row: Cell[], rowIndex: number) => {
    row.forEach((cell: Cell, colIndex: number) => {
      if (cell.type === CELL.CELL_TYPE.EMPTY) {
        const around = getAdjacentLocations({ row: rowIndex, col: colIndex });

        let mineCounter = 0;
        around.forEach((aroundPosition: { row: number, col: number }) => {
          const aroundRow = board[aroundPosition.row];

          if (aroundRow) {
            const aroundCell = aroundRow[aroundPosition.col];

            if (aroundCell) {
              mineCounter += aroundCell.isMine() ? 1 : 0;
            }
          }
        });

        cell.mineIndicator = mineCounter;
      }
    });
  });

  return board;
}
