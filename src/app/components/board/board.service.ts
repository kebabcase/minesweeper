import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import { Board, CellLocation } from '../../types';
import { APP, BOARD } from '../../constants';

import { generateBoard, populateBoard, openEmptyCells } from '../../utilities/board-utility';
import { getAdjacentLocations, getAdjacentCells } from '../../utilities/cell-utility';

@Injectable()
export class MsBoardService {
  private currentBoard: Board;
  private gameStatus = BOARD.GAME_STATUS.STATIC;

  private board$ = new Subject<Board>();
  private gameStatus$ = new BehaviorSubject<BOARD.GAME_STATUS>(this.gameStatus);

  public getBoard(): Observable<Board> {
    return this.board$.pipe();
  }

  public getGameStatus(): Observable<BOARD.GAME_STATUS> {
    return this.gameStatus$.pipe();
  }

  public initializeBoard(level: APP.LEVEL): Promise<Board> {
    return new Promise((resolve) => {
      const boardDimension = BOARD.BOARD_SIZE[level];

      const generatedBoard = generateBoard(level);
      this.currentBoard = populateBoard(generatedBoard, level);

      this.board$.next(this.currentBoard);

      resolve(this.currentBoard);
    });
  }

  public discoverAdjacentCells(targetLocation: CellLocation): void {
    this.board$.next(openEmptyCells(targetLocation, this.currentBoard));
  }

  public setGameStatus(status: BOARD.GAME_STATUS): void {
    this.gameStatus$.next(status);
  }
}
