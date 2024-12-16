import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalkComponent } from './walk.component';
import { WalkService } from '../../services/walk.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { GetWalkValues } from '../../../core/enum/currentUser.enum';
import { timer } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// Mock de WalkService
jest.mock('../../services/walk.service');

// Mock de Router
jest.mock('@angular/router');

describe('WalkComponent', () => {
  let component: WalkComponent;
  let fixture: ComponentFixture<WalkComponent>;
  let mockWalkService: jest.Mocked<WalkService>;
  let mockRouter: Router;

  beforeEach(() => {
    // Inicializamos los mocks
    mockWalkService = {
      userName: 'Test User',
      highScore: 15,
      score: 10,
      logout: jest.fn().mockResolvedValue(undefined),
      saveScores: jest.fn(),
      isAuth: jest.fn().mockReturnValue(true),
      getScores: jest.fn(),
      setScores: jest.fn(),
      addScores: jest.fn(),
      loginUser: jest.fn().mockResolvedValue(''),
    };

    mockRouter = {
      navigateByUrl: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      declarations: [WalkComponent],
      providers: [
        { provide: WalkService, useValue: mockWalkService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userName, highScore, and score from WalkService', () => {
    component.ngOnInit();  //     We call ngOnInit to initialize the values

    expect(component.userName).toBe('Test User');
    expect(component.highScore).toBe(15);
    expect(component.score).toBe(10);
  });

  it('should reset score to 0 when bulbState is RED and sendEvent is called', () => {
    component.bulbState = GetWalkValues.RED;
    component.score = 5;
    
    component.sendEvent(GetWalkValues.LEFT);  // LWe call sendEvent

    expect(component.score).toBe(0); 
  });

  it('should update score and highScore when bulbState is GREEN and step is correct', () => {
    component.bulbState = GetWalkValues.GREEN;
    component.newStep = GetWalkValues.LEFT;
    component.score = 5;
    component.highScore = 10;

    component.sendEvent(GetWalkValues.LEFT);  // We call sendEvent with the correct step

    expect(component.score).toBe(6); 
    expect(component.highScore).toBe(10); // The high score must remain the same
  });

  it('should decrement score when bulbState is GREEN and step is incorrect', () => {
    component.bulbState = GetWalkValues.GREEN;
    component.newStep = GetWalkValues.LEFT;
    component.score = 5;
    component.highScore = 10;

    component.sendEvent(GetWalkValues.RIGHT);  // We call sendEvent with the wrong step

    expect(component.score).toBe(4); 
    expect(component.highScore).toBe(10); // The high score must remain the same
  });

  it('should start timer and call startWalk when countdown reaches 0', () => {
    jest.spyOn(component, 'startWalk'); // We spy on the startWalk function
    component.startTimer();

    jest.advanceTimersByTime(3000);  // We advance the timers

    expect(component.bulbState).toBe(GetWalkValues.RED);
  });

  it('should call logout and navigate to home', async () => {
    await component.logout();  // call  logout

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');  //     We verify that you have navigated to the main page
  });

  it('should switch bulbState to GREEN after 3 seconds', (done) => {
    component.startWalk(); // call a startWalk

    setTimeout(() => {
      expect(component.bulbState).toBe(GetWalkValues.GREEN); 
      done();
    }, 3000);  // wait 3 sec
  });

  it('should calculate time correctly in checkGreenLight', () => {
    component.score = 10;
    component.checkGreenLight();

    expect(component.time).toBeDefined();  // We verify that time is defined
    expect(Number(component.time)).toBeGreaterThanOrEqual(0);  // We verify that time is a non-negative number
  });

  it('should decrement the countdown time when startTimer is called and initialTimeCountDown is false', () => {
    component.timeCountDown = 30;
    component.initialTimeCountDown = false;
    component.startTimer();  // call startTimer

    expect(component.timeCountDown).toBe(20); // countdown should have decreased by 10
  });
});
