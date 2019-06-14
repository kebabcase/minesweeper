import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material';

import { APP } from './constants';

@Component({
  selector: 'ms-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class MsAppComponent {
  public LEVELS = Object.freeze(APP.LEVELS);

  public selectedLevel = APP.LEVELS[0].value;

  public onLevelChange(selectChange: MatSelectChange) {
    this.selectedLevel = selectChange.value;
  }
}
