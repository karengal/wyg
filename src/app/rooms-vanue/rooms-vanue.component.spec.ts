import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsVanueComponent } from './rooms-vanue.component';

describe('RoomsVanueComponent', () => {
  let component: RoomsVanueComponent;
  let fixture: ComponentFixture<RoomsVanueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsVanueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsVanueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
