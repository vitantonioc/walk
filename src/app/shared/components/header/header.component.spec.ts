import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let emitSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // Create a spy on the EventEmitter to check if the event is emitted
    emitSpy = jest.spyOn(component.onLogout, 'emit');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input userName', () => {
    component.userName = 'Test User';
    fixture.detectChanges();
    expect(component.userName).toBe('Test User'); 
  });

  it('should emit onLogout event when logout is called', () => {
    component.logout(); 
    
    // We verify that the event has been broadcast
    expect(emitSpy).toHaveBeenCalledWith(true);
  });
});
