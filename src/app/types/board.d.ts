import { Cell } from '../components/cell/cell.class';

export type Board = Cell[][];

export interface BoardDimension {
  x: number;
  y: number;
  total: number;
}
