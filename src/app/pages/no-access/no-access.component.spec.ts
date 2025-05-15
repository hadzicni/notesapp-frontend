import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoAccessComponent } from './no-access.component';

describe('NoAccessComponent', () => {
  let component: NoAccessComponent;
  let fixture: ComponentFixture<NoAccessComponent>;
  let locationSpy: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      imports: [NoAccessComponent], // richtig für standalone-Komponenten
      providers: [{ provide: Location, useValue: locationSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title and message', () => {
    const title = fixture.debugElement.query(
      By.css('.no-access-title')
    ).nativeElement;
    const message = fixture.debugElement.query(
      By.css('.no-access-message')
    ).nativeElement;
    expect(title.textContent).toContain('Access Denied');
    expect(message.textContent).toContain("Sorry, you don't have permission");
  });

  it('should call location.back() when button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('.back-button')
    ).nativeElement;
    button.click();
    expect(locationSpy.back).toHaveBeenCalled();
  });
});
