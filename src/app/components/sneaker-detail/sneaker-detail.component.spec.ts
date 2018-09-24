import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerDetailComponent } from './sneaker-detail.component';

describe('SneakerDetailComponent', () => {
  let component: SneakerDetailComponent;
  let fixture: ComponentFixture<SneakerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
