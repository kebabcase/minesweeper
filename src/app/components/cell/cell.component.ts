import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { BOARD, CELL } from '../../constants';

import { Cell } from './cell.class';

@Component({
  selector: 'ms-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class MsCellComponent implements OnChanges {
  @Input() public cell: Cell;
  @Input() public gameStatus: BOARD.GAME_STATUS;
  @Input() public flagsAvailable: number;

  @Output() public cellDiscover = new EventEmitter<Cell>();
  @Output() public cellFlag = new EventEmitter<Cell>();

  public wrongChoice = false;
  public isGameOver = false;

  @HostListener('contextmenu', ['$event'])
  public onRightClick($event: MouseEvent) {
    $event.preventDefault();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.gameStatus) {
      this.isGameOver = this.gameStatus === BOARD.GAME_STATUS.FAIL;

      if (this.gameStatus === BOARD.GAME_STATUS.WON && this.cell.isMine() && !this.cell.flagged) {
        this.cell.flagged = true;
        this.cellFlag.emit(this.cell);
      }
    }
  }

  public onCellMouseup($event: MouseEvent) {
    if (!this.cell.hidden || this.gameStatus === BOARD.GAME_STATUS.WON || this.gameStatus === BOARD.GAME_STATUS.FAIL) {
      return;
    }

    if (!this.cell.flagged && $event.button === 0) {
      // Handle left click

      if (this.cell.isMine()) {
        this.wrongChoice = true;
      }

      this.cell.hidden = false;
      this.cellDiscover.emit(this.cell);
    } else if ($event.button === 2) {
      // Handle right click

      let newType: CELL.CELL_TYPE;

      if (this.cell.flagged) {
        this.cell.flagged = false;
        newType = this.cell.getOriginalType();

        this.cell.type = newType;
        this.cellFlag.emit(this.cell);
      } else if (this.flagsAvailable > 0) {
        this.cell.flagged = true;
        newType = CELL.CELL_TYPE.FLAG;

        this.cell.type = newType;
        this.cellFlag.emit(this.cell);
      }
    }
  }
}
