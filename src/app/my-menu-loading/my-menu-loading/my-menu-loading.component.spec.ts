import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMenuLoadingComponent } from './my-menu-loading.component';

describe('MyMenuLoadingComponent', () => {
  let component: MyMenuLoadingComponent;
  let fixture: ComponentFixture<MyMenuLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyMenuLoadingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMenuLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
