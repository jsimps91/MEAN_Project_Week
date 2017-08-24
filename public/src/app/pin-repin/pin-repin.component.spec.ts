import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinRepinComponent } from './pin-repin.component';

describe('PinRepinComponent', () => {
  let component: PinRepinComponent;
  let fixture: ComponentFixture<PinRepinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinRepinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinRepinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
