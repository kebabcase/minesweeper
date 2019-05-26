import {
  NgZone,
  ElementRef,
  ChangeDetectorRef,
  ViewRef,
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Board } from '../../types';
import { APP, BOARD, CELL } from '../../constants';

import { MsBoardService } from './board.service';

import { Cell } from '../cell/cell.class';

import { determineGameWon } from '../../utilities/board-utility';

@Component({
  selector: 'ms-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [MsBoardService],
})
export class MsBoardComponent implements AfterViewInit, OnChanges {
  // 59 min 59 sec
  private MAX_TIME = 3599;

  @Input() public level: APP.LEVEL;

  public board: Board;

  public gameStatus: BOARD.GAME_STATUS;
  public isGameWon = false;
  public isGameLose = false;

  public flagsAvailable: number;
  private totalNumCells: number;

  public timer = new Date(0);
  private timerInterval: number;

  public isMouseDown = false;
  public isMouseEnteredFace = false;
  public isMouseEntered = false;

  constructor(private zone: NgZone,
              private element: ElementRef,
              private changeDetector: ChangeDetectorRef,
              private msBoardService: MsBoardService) {
    msBoardService.getBoard().subscribe((board: Board) => this.board = board);
    msBoardService.getGameStatus().subscribe(this.onGameStatusChange.bind(this));
  }

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('mouseup', this.onMouseUp.bind(this));
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.level) {
      this.totalNumCells = BOARD.BOARD_SIZE[this.level].total;
      this.onNewGame();
    }
  }

  public onGameStatusChange(status: BOARD.GAME_STATUS): void {
    if (status === BOARD.GAME_STATUS.ACTIVE) {
      if (!this.timerInterval) {
        this.timer = new Date(1000);
        this.timerInterval = window.setInterval(() => {
          const currentTime = this.timer.getSeconds();
          if (currentTime >= this.MAX_TIME) {
            this.msBoardService.setGameStatus(BOARD.GAME_STATUS.FAIL);
          } else {
            this.timer = new Date((currentTime + 1) * 1000);
          }

          this.changeDetector.detectChanges();
        }, 1000);
      }
    } else {
      if (status === BOARD.GAME_STATUS.STATIC) {
        this.reset();
      } else {
        this.isGameWon = status === BOARD.GAME_STATUS.WON;
        this.isGameLose = status === BOARD.GAME_STATUS.FAIL;
      }

      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    this.gameStatus = status;
    if (this.board) {
      this.changeDetector.detectChanges();
    }
  }

  public onNewGame(): void {
    this.msBoardService.setGameStatus(BOARD.GAME_STATUS.STATIC);

    this.msBoardService.initializeBoard(this.level)
      .then(() => this.flagsAvailable = BOARD.NUM_MINES[this.level]);
  }

  public onCellDiscover(cell: Cell): void {
    this.setGameActive();

    if (cell.isMine()) {
      this.msBoardService.setGameStatus(BOARD.GAME_STATUS.FAIL);
      return;
    } else if (cell.empty) {
      this.msBoardService.discoverAdjacentCells(cell.location);
    }

    this.checkGameWon();
  }

  public onCellFlag(cell: Cell): void {
    this.setGameActive();

    const { row, col } = cell.location;
    this.board[row][col] = cell;

    if (cell.flagged) {
      this.flagsAvailable--;
    } else {
      this.flagsAvailable++;
    }

    this.checkGameWon();
  }

  public onMouseDown(): void {
    this.isMouseDown = true;
  }

  public onMouseUp(): void {
    this.isMouseDown = false;
  }

  public onMouseEnter(type: string): void {
    if (type === 'face') {
      this.isMouseEnteredFace = true;
    } else {
      this.isMouseEntered = true;
    }
  }

  public onMouseLeave(type: string): void {
    if (type === 'face') {
      this.isMouseEnteredFace = false;
    } else {
      this.isMouseEntered = false;
    }
  }

  private setGameActive(): void {
    if (this.gameStatus === BOARD.GAME_STATUS.STATIC) {
      this.msBoardService.setGameStatus(BOARD.GAME_STATUS.ACTIVE);
    }
  }

  private checkGameWon(): void {
    if (this.gameStatus !== BOARD.GAME_STATUS.WON && determineGameWon(this.board, this.totalNumCells)) {
      this.msBoardService.setGameStatus(BOARD.GAME_STATUS.WON);
    }
  }

  private reset(): void {
    this.timer = new Date(0);
    this.isGameWon = false;
    this.isGameLose = false;
  }
}
