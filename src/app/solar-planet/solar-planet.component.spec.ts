import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarPlanetComponent } from './solar-planet.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';

describe('SolarPlanetComponent', () => {
  let component: SolarPlanetComponent;
  let fixture: ComponentFixture<SolarPlanetComponent>;

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
});
