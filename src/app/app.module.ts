import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatOptionModule,
  MatSelectModule,
  MatFormFieldModule,
  MatToolbarModule,
  MAT_RIPPLE_GLOBAL_OPTIONS,
} from '@angular/material';

import { ComponentsModule } from './components/components.module';

import { MsAppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,

    ComponentsModule,
  ],
  providers: [
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { disabled: true },
    },
  ],
  declarations: [
    MsAppComponent,
  ],
  bootstrap: [
    MsAppComponent,
  ],
})
export class MsAppModule {
}
