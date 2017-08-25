import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTopicsComponent } from './choose-topics.component';

describe('ChooseTopicsComponent', () => {
  let component: ChooseTopicsComponent;
  let fixture: ComponentFixture<ChooseTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
