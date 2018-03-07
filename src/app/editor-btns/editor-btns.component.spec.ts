import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorBtnsComponent } from './editor-btns.component';

describe('EditorBtnsComponent', () => {
  let component: EditorBtnsComponent;
  let fixture: ComponentFixture<EditorBtnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
