import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarRouteComponent } from './solar-route.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SolarRouteComponent', () => {
  let component: SolarRouteComponent;
  let fixture: ComponentFixture<SolarRouteComponent>;
  let solarRouteComponentdebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      declarations: [SolarRouteComponent],
      providers: [AngularFirestore]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolarRouteComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarRouteComponent);
    component = fixture.componentInstance;
    solarRouteComponentdebugElement = fixture.debugElement.children[0];
    fixture.detectChanges();
  });

  it('should create Solar Route Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Header with correct "Solar Planet Routes" text', () => {
    const fixture = TestBed.createComponent(SolarRouteComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#headertxt').textContent).toContain(
      'Solar Planet Routes'
    );
  });

  it('should render list of planet routes', () => {
    component = solarRouteComponentdebugElement.componentInstance;
    component.solarRouteList = [
      {
        routeId: '121',
        solarRouteOrigin: 'A',
        solarRouteDestination: 'B',
        solarRouteDistance: '2'
      },
      {
        routeId: '131',
        solarRouteOrigin: 'B',
        solarRouteDestination: 'C',
        solarRouteDistance: '4'
      }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.planet-origin-card')).length
    ).toEqual(2);
  });

  it('It should match with Planet Origin', () => {
    component = solarRouteComponentdebugElement.componentInstance;
    component.solarRouteList = [
      {
        routeId: '121',
        solarRouteOrigin: 'A',
        solarRouteDestination: 'B',
        solarRouteDistance: '2'
      },
      {
        routeId: '131',
        solarRouteOrigin: 'B',
        solarRouteDestination: 'C',
        solarRouteDistance: '4'
      }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.planet-origin-card'))[0]
        .nativeElement.innerText.trim()
    ).toEqual('Planet Origin : A');
  });

  it('It should match with Planet Destination', () => {
    component = solarRouteComponentdebugElement.componentInstance;
    component.solarRouteList = [
      {
        routeId: '121',
        solarRouteOrigin: 'A',
        solarRouteDestination: 'B',
        solarRouteDistance: '2'
      },
      {
        routeId: '131',
        solarRouteOrigin: 'B',
        solarRouteDestination: 'C',
        solarRouteDistance: '4'
      }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.planet-destination-card'))[1]
        .nativeElement.innerText.trim()
    ).toEqual('Planet Destination : C');
  });
});
