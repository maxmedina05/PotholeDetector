import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetDefectListComponent } from './street-defect-list.component';

describe('StreetDefectListComponent', () => {
  let component: StreetDefectListComponent;
  let fixture: ComponentFixture<StreetDefectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreetDefectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreetDefectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
