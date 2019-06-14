import { CellLocation } from '../../types';
import { CELL } from '../../constants';

export class Cell {
  private originalType: CELL.CELL_TYPE = null;

  private cellType = CELL.CELL_TYPE.EMPTY;
  public get type(): CELL.CELL_TYPE {
    return this.cellType;
  }
  public set type(cellType: CELL.CELL_TYPE) {
    this.cellType = cellType;

    if (this.originalType === null) {
      this.originalType = cellType;
    }
  }

  private cellLocation: CellLocation;
  public get location(): CellLocation {
    return this.cellLocation;
  }
  public set location(cellLocation: CellLocation) {
    this.cellLocation = cellLocation;
  }

  private cellHidden = true;
  public get hidden(): boolean {
    return this.cellHidden;
  }
  public set hidden(cellHidden: boolean) {
    this.cellHidden = cellHidden;
  }

  private cellFlagged = false;
  public get flagged(): boolean {
    return this.cellFlagged;
  }
  public set flagged(cellFlagged: boolean) {
    this.cellFlagged = cellFlagged;
  }

  // Poor naming choice; "empty" here means the cell doesn't contain a mine
  private cellEmpty = false;
  public get empty(): boolean {
    return !this.isMine() && this.cellEmpty;
  }
  public set empty(cellEmpty: boolean) {
    this.cellEmpty = cellEmpty;
  }

  private cellMineIndicator: number = null;
  public get mineIndicator(): number {
    return this.cellMineIndicator;
  }
  public set mineIndicator(cellMineIndicator: number) {
    this.cellMineIndicator = cellMineIndicator;
    this.empty = this.cellMineIndicator === 0;
  }

  /**
   * Cell constructor
   *
   * @param row Row index
   * @param col Col index
   */
  constructor(row: number, col: number) {
    this.location = { row, col };
  }

  public getOriginalType(): CELL.CELL_TYPE {
    return this.originalType;
  }

  public isMine(): boolean {
    return this.originalType === CELL.CELL_TYPE.MINE;
  }
}
