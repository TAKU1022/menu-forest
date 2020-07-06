import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeShellComponent } from './welcome-shell.component';

describe('WelcomeShellComponent', () => {
  let component: WelcomeShellComponent;
  let fixture: ComponentFixture<WelcomeShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeShellComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
