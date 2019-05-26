import { Board } from '../types';
import { APP, BOARD } from '../constants';

import { Cell } from '../components/cell/cell.class';

import * as boardUtilityModule from './board-utility';

describe('BoardUtility', () => {
  describe('generateBoard', () => {
    APP.LEVELS.forEach((level: { display: string; value: APP.LEVEL }) => {
      const { x, y } = BOARD.BOARD_SIZE[level.value];

      it(`should generate ${x} x ${y} sized board for ${level.display.toLowerCase()} level.`, () => {
        const board = boardUtilityModule.generateBoard(level.value);

        expect(board.length).toEqual(y);
        expect(board[0].length).toEqual(x);
      });
    });
  });

  describe('populateBoard', () => {
    APP.LEVELS.forEach((level: { display: string; value: APP.LEVEL }) => {
      const totalNumMines = BOARD.NUM_MINES[level.value];

      it(`should populate ${totalNumMines} number of mines for ${level.display.toLowerCase()} level.`, () => {
        const board = boardUtilityModule.generateBoard(level.value);
        const populatedBoard = boardUtilityModule.populateBoard(board, level.value);

        let mineCounter = 0;
        populatedBoard.forEach((row: Cell[]) => {
          row.forEach((cell: Cell) => {
            mineCounter += cell.isMine() ? 1 : 0;
          });
        });

        expect(mineCounter).toEqual(totalNumMines);
      });
    });
  });
});
