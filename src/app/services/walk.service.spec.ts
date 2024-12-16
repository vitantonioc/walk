import { WalkService } from './walk.service';
import { StorageEnum } from '../../core/enum/storageEnum.enum';
import { CurrentUserEnum } from '../../core/enum/currentUser.enum';
import { MapValue } from '../../core/models/mapValue.model';

describe('WalkService', () => {
  let service: WalkService;

  // Mocks for localStorage
  beforeEach(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0, 
      key: jest.fn((index: number) => null),
    };

    // We replace window.localStorage with the mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    service = new WalkService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    const userName = 'testUser';
    const scores = JSON.stringify({ score: 10, highscore: 20 });

    // We simulate that getItem returns a valid value
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(userName);
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(scores);

    const result = service.isAuth();
    expect(result).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalledWith(StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER);
  });

  it('should return false if user is not authenticated', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

    const result = service.isAuth();
    expect(result).toBe(false);
    expect(localStorage.getItem).toHaveBeenCalledWith(StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER);
  });

  it('should save scores to localStorage when saveScores is called', () => {
    const scores = { score: 10, highscore: 20 };

    service.userName = 'testUser';

    service.saveScores(scores);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      StorageEnum.LOCALSTORAGE_STEP + service.userName,
      JSON.stringify(scores)
    );
  });

  it('should get scores from localStorage and set them', () => {
    const userScores = { score: 10, highscore: 20 };
    const userName = 'testUser';
    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(userScores));

    service.getScores(userName);

    expect(localStorage.getItem).toHaveBeenCalledWith(
      StorageEnum.LOCALSTORAGE_STEP + userName
    );
    expect(service.score).toBe(10);
    expect(service.highScore).toBe(20);
  });

  it('should add new scores to localStorage when addScores is called', () => {
    const userName = 'testUser';

    service.addScores(userName);

    const expected = { highscore: 0, score: 0 };
    expect(localStorage.setItem).toHaveBeenCalledWith(
    StorageEnum.LOCALSTORAGE_STEP + userName,
    JSON.stringify(expected)
  );
    
  });

  it('should log in a user and save user to localStorage', async () => {
    const userName = 'testUser';
    const scores = null;

    (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(scores);

    await service.loginUser(userName);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER,
      userName
    );
    expect(service.userName).toBe(userName);
  });

  it('should log out the user and remove from localStorage', async () => {
    await service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER
    );
  });
});
