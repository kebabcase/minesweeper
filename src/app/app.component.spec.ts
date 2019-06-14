import { TestBed, async } from '@angular/core/testing';

import {
  MatOptionModule,
  MatSelectModule,
  MatFormFieldModule,
  MatToolbarModule,
} from '@angular/material';

import { ComponentsModule } from './components/components.module';

import { MsAppComponent } from './app.component';

describe('MsAppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatOptionModule,
        MatSelectModule,
        MatFormFieldModule,
        MatToolbarModule,

        ComponentsModule,
      ],
      declarations: [
        MsAppComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app.', () => {
    const fixture = TestBed.createComponent(MsAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
