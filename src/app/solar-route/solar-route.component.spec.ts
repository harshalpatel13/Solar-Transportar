import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarRouteComponent } from './solar-route.component';

describe('SolarRouteComponent', () => {
  let component: SolarRouteComponent;
  let fixture: ComponentFixture<SolarRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
