import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarRouteComponent } from './solar-route.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';

describe('SolarRouteComponent', () => {
  let component: SolarRouteComponent;
  let fixture: ComponentFixture<SolarRouteComponent>;

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
});
