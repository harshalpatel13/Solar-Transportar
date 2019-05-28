import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarPlanetComponent } from './solar-planet.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SolarPlanetComponent', () => {
  let component: SolarPlanetComponent;
  let fixture: ComponentFixture<SolarPlanetComponent>;
  let solarPlanetComponentdebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      declarations: [SolarPlanetComponent],
      providers: [AngularFirestore]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolarPlanetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarPlanetComponent);
    component = fixture.componentInstance;
    solarPlanetComponentdebugElement = fixture.debugElement.children[0];
    fixture.detectChanges();
  });

  it('should create Solar Planet component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Header with correct "Solar Planets" text', () => {
    const fixture = TestBed.createComponent(SolarPlanetComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#headertxt').textContent).toContain(
      'Solar Planets'
    );
  });

  it('should render list of planet card', () => {
    component = solarPlanetComponentdebugElement.componentInstance;
    component.planetList = [
      { planetName: 'Earth', planetNode: 'A' },
      { planetName: 'Moon', planetNode: 'B' }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.planetName-card')).length
    ).toEqual(2);
  });

  it('It should match with planet card-name', () => {
    component = solarPlanetComponentdebugElement.componentInstance;
    component.planetList = [
      { planetName: 'Earth', planetNode: 'A' },
      { planetName: 'Moon', planetNode: 'B' }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.planetName-card'))[1]
        .nativeElement.innerText.trim()
    ).toEqual('Planet Name : Moon');
  });

  it('It should match with planet node card-name', () => {
    component = solarPlanetComponentdebugElement.componentInstance;
    component.planetList = [
      { planetName: 'Earth', planetNode: 'A' },
      { planetName: 'Moon', planetNode: 'B' }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.planetName-node'))[1]
        .nativeElement.innerText.trim()
    ).toEqual('Planet Node : B');
  });
});
