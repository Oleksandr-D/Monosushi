import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBackDialogComponent } from './call-back-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('CallBackDialogComponent', () => {
  let component: CallBackDialogComponent;
  let fixture: ComponentFixture<CallBackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallBackDialogComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallBackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
