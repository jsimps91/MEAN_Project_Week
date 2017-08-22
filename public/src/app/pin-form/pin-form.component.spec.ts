import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinFormComponent } from './pin-form.component';

describe('PinFormComponent', () => {
  let component: PinFormComponent;
  let fixture: ComponentFixture<PinFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
