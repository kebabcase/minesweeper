import { clone } from 'lodash';

import { Board, CellLocation } from '../types';

import { Cell } from '../components/cell/cell.class';

export function getAdjacentLocations({ row, col }: CellLocation): CellLocation[] {
  return [
    { row: row - 1, col: col - 1 }, // left top
    { row: row - 1, col }, // top
    { row: row - 1, col: col + 1 }, // right top
    { row, col: col - 1 }, // left
    { row, col: col + 1 }, // right
    { row: row + 1, col: col - 1 }, // left bottom
    { row: row + 1, col }, // bottom
    { row: row + 1, col: col + 1 }, // right bottom
  ];
}

/**
 * Returns copies of adjacent cells based on given cell location.
 *
 * @param board Minesweeper board
 * @param cellLocation Cell location
 */
export function getAdjacentCells(board: Board, cellLocation: CellLocation): Cell[] {
  const adjacentLocations = getAdjacentLocations(cellLocation);

  const cells = [];
  adjacentLocations.forEach(({ row, col }: CellLocation) => {
    const adjacentRow = board[row];

    if (adjacentRow) {
      const cell = adjacentRow[col];

      if (cell) {
        cells.push(clone(cell));
      }
    }
  });

  return cells;
}
