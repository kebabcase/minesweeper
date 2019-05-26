import { LEVEL } from './app';

export enum GAME_STATUS {
  STATIC = 0,
  ACTIVE,
  FAIL,
  WON,
}

export const NUM_MINES = {
  [LEVEL.BEGINNER]: 10,
  [LEVEL.INTERMEDIATE]: 40,
  [LEVEL.EXPERT]: 99,
};

export const BOARD_SIZE = {
  [LEVEL.BEGINNER]: {
    x: 9,
    y: 9,
    total: 81,
  },
  [LEVEL.INTERMEDIATE]: {
    x: 16,
    y: 16,
    total: 256,
  },
  [LEVEL.EXPERT]: {
    x: 30,
    y: 16,
    total: 480,
  },
};
