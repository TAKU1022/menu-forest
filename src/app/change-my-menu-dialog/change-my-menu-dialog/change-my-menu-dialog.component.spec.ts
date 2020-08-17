import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMyMenuDialogComponent } from './change-my-menu-dialog.component';

describe('ChangeMyMenuDialogComponent', () => {
  let component: ChangeMyMenuDialogComponent;
  let fixture: ComponentFixture<ChangeMyMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeMyMenuDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMyMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
