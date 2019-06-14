import { Board } from '../types';
import { BOARD } from '../constants';

import { Cell } from '../components/cell/cell.class';

import * as cellUtilityModule from './cell-utility';

function generateSquareBoard(size: number): Board {
  const board = [];
  for (let row = 0; row < size; row++) {
    board.push([]);

    for (let col = 0; col < size; col++) {
      board[row].push(new Cell(row, col));
    }
  }
  return board;
}

describe('CellUtility', () => {
  const BOARD_SIZE = 3;

  it('SETUP: board size should be no less than 3.', () => {
    expect(BOARD_SIZE >= 3).toEqual(true);
  });

  describe('getAdjacentCells', () => {
    it('should return adjacent cells.', () => {
      const board = generateSquareBoard(BOARD_SIZE);
      const adjacentCells = cellUtilityModule.getAdjacentCells(board, { row: 1, col: 1 });
      const numberOfAllValidAdjacentCells = 8;

      expect(adjacentCells.length).toEqual(numberOfAllValidAdjacentCells);
    });

    it('should return adjacent cells that are valid only.', () => {
      const board = generateSquareBoard(BOARD_SIZE);
      const adjacentCells = cellUtilityModule.getAdjacentCells(board, { row: 0, col: 0 });
      const numberOfValidAdjacentCells = 3;

      expect(adjacentCells.length).toEqual(numberOfValidAdjacentCells);
    });
  });
});
