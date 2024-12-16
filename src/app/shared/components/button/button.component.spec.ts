import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let emitSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;

    // Create a spy to verify that the event is emitted correctly
    emitSpy = jest.spyOn(component.onEvent, 'emit');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should default modeButton to "left"', () => {
    expect(component.modeButton).toBe('left');
  });

  it('should convert modeButton to uppercase in textButton getter', () => {
    component.modeButton = 'right';
    fixture.detectChanges();
    expect(component.textButton).toBe('RIGHT'); 
  });

  it('should emit onEvent when clickBtn is called', () => {
    const mode = 'left'; 
    component.clickBtn(mode); 

    expect(emitSpy).toHaveBeenCalledWith(mode); 
  });

  it('should emit onEvent when button is clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    const mode = 'left'; 

    buttonElement.triggerEventHandler('click', null); 
    expect(emitSpy).toHaveBeenCalledWith(mode);  
  });
});
