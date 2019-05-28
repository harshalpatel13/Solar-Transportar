import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { StarPlanetSystemComponent } from './star-planet-system.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('StarPlanetSystemComponent', () => {
  let component: StarPlanetSystemComponent;
  let fixture: ComponentFixture<StarPlanetSystemComponent>;
  let starPlanetSystemComponentdebugElement: DebugElement;

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
    starPlanetSystemComponentdebugElement = fixture.debugElement.children[0];
    fixture.detectChanges();
  });

  it('should create StarPlanet System Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render dropdown with correct "Source Planet:" label', () => {
    const fixture = TestBed.createComponent(StarPlanetSystemComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#sourcelbl').textContent).toContain(
      'Source Planet:'
    );
  });

  it('should render dropdown with correct "Destination Planet:" label', () => {
    const fixture = TestBed.createComponent(StarPlanetSystemComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#destinationlbl').textContent).toContain(
      'Destination Planet:'
    );
  });

  it('should render dropdown with correct "Solar Galaxy Path" label', () => {
    const fixture = TestBed.createComponent(StarPlanetSystemComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#solarpathlbl').textContent).toContain(
      'Solar Galaxy Path'
    );
  });

  it('should render source planet dropdown list', () => {
    component = starPlanetSystemComponentdebugElement.componentInstance;
    component.planets = [
      { planetName: 'Earth', planetNode: 'A' },
      { planetName: 'Moon', planetNode: 'B' }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement.queryAll(By.css('.source-menu-item')).length
    ).toEqual(2);
  });

  it('It should match with source dropdown option value', () => {
    component = starPlanetSystemComponentdebugElement.componentInstance;
    component.planets = [
      { planetName: 'Earth', planetNode: 'A' },
      { planetName: 'Moon', planetNode: 'B' }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.source-menu-item'))[0]
        .nativeElement.innerText.trim()
    ).toEqual('Earth (A)');
  });

  it('It should match with destination dropdown option value', () => {
    component = starPlanetSystemComponentdebugElement.componentInstance;
    component.planets = [
      { planetName: 'Earth', planetNode: 'A' },
      { planetName: 'Moon', planetNode: 'B' }
    ];
    fixture.detectChanges();
    expect(
      fixture.debugElement
        .queryAll(By.css('.source-menu-item'))[1]
        .nativeElement.innerText.trim()
    ).toEqual('Moon (B)');
  });
});
