import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerAdminComponent } from './sneaker-admin.component';

describe('SneakerAdminComponent', () => {
  let component: SneakerAdminComponent;
  let fixture: ComponentFixture<SneakerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SneakerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SneakerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
