import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMyMenuDialogComponent } from './update-my-menu-dialog.component';

describe('UpdateMyMenuDialogComponent', () => {
  let component: UpdateMyMenuDialogComponent;
  let fixture: ComponentFixture<UpdateMyMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMyMenuDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMyMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
