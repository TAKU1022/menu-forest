import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMyMenuComponent } from './create-my-menu.component';

describe('CreateMyMenuComponent', () => {
  let component: CreateMyMenuComponent;
  let fixture: ComponentFixture<CreateMyMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMyMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
