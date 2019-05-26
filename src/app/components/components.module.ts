import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';

import { MsCellComponent } from './cell/cell.component';
import { MsBoardComponent } from './board/board.component';

@NgModule({
  imports: [
    BrowserModule,

    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  declarations: [
    MsCellComponent,
    MsBoardComponent,
  ],
  exports: [
    MsBoardComponent,
  ],
})
export class ComponentsModule {
}
