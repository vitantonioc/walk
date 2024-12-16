import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { WalkService } from '../../app/services/walk.service';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let walkServiceMock: jest.Mocked<WalkService>;

  beforeEach(() => {
    // We create a complete mock of the WalkService service
    walkServiceMock = {
      userName: '',  
      score: 0,   
      highScore: 0, 
      isAuth: jest.fn(), 
      saveScores: jest.fn(), 
      getScores: jest.fn(), 
      setScores: jest.fn(),
      addScores: jest.fn(), 
      loginUser: jest.fn(), 
      logout: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: WalkService, useValue: walkServiceMock },
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should call isAuth and return true when user is authenticated', () => {
    walkServiceMock.isAuth.mockReturnValue(true);

    // We execute the canLoad method
    guard.canLoad().subscribe(result => {
      expect(result).toBe(true);  
      expect(walkServiceMock.isAuth).toHaveBeenCalled(); 
    });
  });

  it('should call isAuth and return false when user is not authenticated', () => {
    walkServiceMock.isAuth.mockReturnValue(false);

    // We execute the canLoad method
    guard.canLoad().subscribe(result => {
      expect(result).toBe(false);  
      expect(walkServiceMock.isAuth).toHaveBeenCalled(); 
    });
  });
});
