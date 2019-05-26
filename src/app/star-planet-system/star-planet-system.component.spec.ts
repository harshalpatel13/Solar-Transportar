import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarPlanetSystemComponent } from './star-planet-system.component';

describe('StarPlanetSystemComponent', () => {
  let component: StarPlanetSystemComponent;
  let fixture: ComponentFixture<StarPlanetSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarPlanetSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarPlanetSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
