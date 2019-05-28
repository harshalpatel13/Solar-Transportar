import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarTrafficComponent } from './solar-traffic.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';

describe('SolarTrafficComponent', () => {
  let component: SolarTrafficComponent;
  let fixture: ComponentFixture<SolarTrafficComponent>;

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
});
