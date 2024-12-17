import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WalkComponent } from './walk.component';
import { WalkService } from '../../services/walk.service';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { GetWalkValues } from '../../../core/enum/currentUser.enum';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

// Mock Service and Router
jest.mock('../../services/walk.service');
jest.mock('@angular/router');

describe('WalkComponent', () => {
  let component: WalkComponent;
  let fixture: ComponentFixture<WalkComponent>;
  let mockWalkService: jest.Mocked<WalkService>;
  let mockRouter: jest.Mocked<Router>;
  let startWalkSpy: jest.SpyInstance;

  beforeEach(() => {
    mockWalkService = {
      userName: 'Test User',
      highScore: 15,
      score: 10,
      isAuth: jest.fn().mockReturnValue(true),
      saveScores: jest.fn(),
      getScores: jest.fn().mockReturnValue(of(null)),
      setScores: jest.fn(),
      addScores: jest.fn(),
      loginUser: jest.fn().mockResolvedValue(''),
      logout: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<WalkService>;
  
    mockRouter = {
      navigateByUrl: jest.fn(),
    } as any;
  
    TestBed.configureTestingModule({
      declarations: [WalkComponent],
      providers: [
        { provide: WalkService, useValue: mockWalkService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  
    fixture = TestBed.createComponent(WalkComponent);
    component = fixture.componentInstance;
    startWalkSpy = jest.spyOn(component, 'startWalk');
  });
  

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // --- Init ---
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize userName, highScore, and score from WalkService', () => {
    expect(component.userName).toBe('Test User');
    expect(component.highScore).toBe(15);
    expect(component.score).toBe(10);
  });

  it('should start timer and walk on ngOnInit', () => {
    jest.spyOn(component, 'startWalk');
    jest.spyOn(component, 'startTimer');
    component.ngOnInit();
    expect(component.startWalk).toHaveBeenCalled();
    expect(component.startTimer).toHaveBeenCalled();
  });

  // --- Test logout ---
  it('should call logout and navigate to home', async () => {
    await component.logout();
    expect(mockWalkService.logout).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('');
  });

  // --- Test sendEvent ---
  it('should reset score to 0 if bulbState is RED', () => {
    component.bulbState = GetWalkValues.RED;
    component.score = 5;
    component.sendEvent(GetWalkValues.LEFT);
    expect(component.score).toBe(0);
  });

  it('should update score and highScore if bulbState is GREEN and step is correct', () => {
    component.bulbState = GetWalkValues.GREEN;
    component.newStep = GetWalkValues.LEFT;
    component.score = 5;
    component.highScore = 10;
    component.sendEvent(GetWalkValues.LEFT);
    expect(component.score).toBe(6);
    expect(component.highScore).toBe(10);
  });

  it('should decrement score if bulbState is GREEN and step is incorrect', () => {
    component.bulbState = GetWalkValues.GREEN;
    component.newStep = GetWalkValues.LEFT;
    component.score = 5;
    component.highScore = 10;
    component.sendEvent(GetWalkValues.RIGHT);
    expect(component.score).toBe(4);
    expect(component.highScore).toBe(10);
  });

  // --- Test startTimer ---
  it('should decrement timeCountDown if initialTimeCountDown is false and timeCountDown > 20', () => {
    component.initialTimeCountDown = false;
    component.timeCountDown = 30;
    component.startTimer();
    expect(component.timeCountDown).toBe(20);
  });

  it('should not decrement timeCountDown if it is <= 20', () => {
    component.initialTimeCountDown = false;
    component.timeCountDown = 10;
    component.startTimer();
    expect(component.timeCountDown).toBe(10);
  });

  it('should call startWalk when countdown reaches 0', fakeAsync(() => {
    jest.spyOn(component, 'startWalk');
    component.timeCountDown = 5;
    component.startTimer();
  
    // We simulate the passage of time
    tick(500);
    tick(5000);
  
    expect(component.startWalk).toHaveBeenCalled();
  
    component.timerSub.unsubscribe();
  }));
  

  // --- Test startWalk ---
  it('should switch bulbState to GREEN after 3 seconds in startWalk', fakeAsync(() => {
    component.startWalk();
    tick(3000);
    expect(component.bulbState).toBe(GetWalkValues.GREEN);
  }));

  // --- Test checkGreenLight ---
  it('should calculate time correctly in checkGreenLight', () => {
    component.score = 10;
    component.checkGreenLight();
    expect(component.time).toBeDefined();
    expect(Number(component.time)).toBeGreaterThanOrEqual(0);
  });

  // --- Test getRandom ---
  it('should generate a random number within the range in getRandom', () => {
    const min = 10;
    const max = 20;
    const random = component.getRandom(min, max);
    expect(random).toBeGreaterThanOrEqual(min);
    expect(random).toBeLessThanOrEqual(max);
  });
});
