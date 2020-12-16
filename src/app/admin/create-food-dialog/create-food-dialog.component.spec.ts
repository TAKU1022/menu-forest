import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFoodDialogComponent } from './create-food-dialog.component';

describe('CreateFoodDialogComponent', () => {
  let component: CreateFoodDialogComponent;
  let fixture: ComponentFixture<CreateFoodDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateFoodDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
