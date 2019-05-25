import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarPlanetComponent } from './solar-planet.component';

describe('SolarPlanetComponent', () => {
  let component: SolarPlanetComponent;
  let fixture: ComponentFixture<SolarPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolarPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
