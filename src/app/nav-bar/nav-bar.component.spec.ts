import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Navigation-Bar Component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Header with correct "SOLAR-SYSTEM" text', () => {
    const fixture = TestBed.createComponent(NavBarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#navHeaderText').textContent).toContain(
      'SOLAR-SYSTEM'
    );
  });

  it('should render link with correct "Dashboard" text', () => {
    const fixture = TestBed.createComponent(NavBarComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#dashboardlink').textContent).toContain(
      'Dashboard'
    );
    expect(compiled.querySelector('#navHeaderText').textContent).toContain(
      'SOLAR-SYSTEM'
    );
  });
});
