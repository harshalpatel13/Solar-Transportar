import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarTrafficComponent } from './solar-traffic.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SolarTrafficComponent', () => {
  let component: SolarTrafficComponent;
  let fixture: ComponentFixture<SolarTrafficComponent>;
  let solarTrafficComponentdebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      declarations: [SolarTrafficComponent],
      providers: [AngularFirestore]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SolarTrafficComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarTrafficComponent);
    component = fixture.componentInstance;
    solarTrafficComponentdebugElement = fixture.debugElement.children[0];
    fixture.detectChanges();
  });

  it('should create Solar Traffic Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Header with correct "Solar Planet Traffic" text', () => {
    const fixture = TestBed.createComponent(SolarTrafficComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#headertxt').textContent).toContain(
      'Solar Planet Traffic'
    );
  });

  it('should render list of planet routes taffic', () => {
    component = solarTrafficComponentdebugElement.componentInstance;
    component.solarTrafficList = [
      {
        solarTrafficRouteId: '121',
        solarTrafficOrigin: 'A',
        solarTrafficDestination: 'B',
        solarTrafficDistance: '2'
      },
      {
        solarTrafficRouteId: '131',
        solarTrafficOrigin: 'B',
        solarTrafficDestination: 'C',
        solarTrafficDistance: '4'
      }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.traffic-route-card')).length
    ).toEqual(2);
  });

  it('It should match with Planet Origin', () => {
    component = solarTrafficComponentdebugElement.componentInstance;
    component.solarTrafficList = [
      {
        solarTrafficRouteId: '121',
        solarTrafficOrigin: 'A',
        solarTrafficDestination: 'B',
        solarTrafficDistance: '2'
      },
      {
        solarTrafficRouteId: '131',
        solarTrafficOrigin: 'B',
        solarTrafficDestination: 'C',
        solarTrafficDistance: '4'
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
    component = solarTrafficComponentdebugElement.componentInstance;
    component.solarTrafficList = [
      {
        solarTrafficRouteId: '121',
        solarTrafficOrigin: 'A',
        solarTrafficDestination: 'B',
        solarTrafficDistance: '2'
      },
      {
        solarTrafficRouteId: '131',
        solarTrafficOrigin: 'B',
        solarTrafficDestination: 'C',
        solarTrafficDistance: '4'
      }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.planet-destination-card'))[1]
        .nativeElement.innerText.trim()
    ).toEqual('Planet Destination : C');
  });

  it('It should match with Planet traffic Distance', () => {
    component = solarTrafficComponentdebugElement.componentInstance;
    component.solarTrafficList = [
      {
        solarTrafficRouteId: '121',
        solarTrafficOrigin: 'A',
        solarTrafficDestination: 'B',
        solarTrafficDistance: '2'
      },
      {
        solarTrafficRouteId: '131',
        solarTrafficOrigin: 'B',
        solarTrafficDestination: 'C',
        solarTrafficDistance: '4'
      }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.planet-traffic-distance-card'))[1]
        .nativeElement.innerText.trim()
    ).toEqual('Traffic Delay (Light Years) : 4');
  });
});
