import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StarPlanetSystemComponent } from './star-planet-system.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StarPlanetSystemComponent', () => {
  let component: StarPlanetSystemComponent;
  let fixture: ComponentFixture<StarPlanetSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxGraphModule,
        AngularFireModule.initializeApp(environment.firebase),
        BrowserAnimationsModule
      ],
      declarations: [StarPlanetSystemComponent],
      providers: [AngularFirestore]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarPlanetSystemComponent]
    }).compileComponents();
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
