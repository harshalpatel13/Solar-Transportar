import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarTrafficComponent } from './solar-traffic.component';

describe('SolarTrafficComponent', () => {
  let component: SolarTrafficComponent;
  let fixture: ComponentFixture<SolarTrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarTrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
