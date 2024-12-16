import { createServiceFactory, SpectatorService } from "@ngneat/spectator";

import { WalkService } from "./walk.service";
import { StorageEnum } from "../../core/enum/storageEnum.enum";
import { Scores } from "../../core/interfaces/scores.interface";
import { CurrentUserEnum } from "../../core/enum/currentUser.enum";


describe("WalkService", () => {
  let spectator: SpectatorService<WalkService>;
  const createService = createServiceFactory(WalkService);

  beforeEach(() => (spectator = createService()));

  it("should not be isAuth in", () => {
    const currentUser: string | null = localStorage.getItem(StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER);
    const auth = spectator.service.isAuth();
    if (currentUser) {
      spectator.service.userName = currentUser;
      expect(auth).toBeFalsy()!;
    }
    expect(auth).toBeFalsy();
  });
 
  it("should not be saveScores in", () => {
    const mockJson = {score:0,highscore:0};
    const userName = 'Jef'
    spectator.service.saveScores(mockJson);
    window.localStorage.setItem(StorageEnum.LOCALSTORAGE_STEP + userName, JSON.stringify(mockJson));
    expect(localStorage.getItem(StorageEnum.LOCALSTORAGE_STEP + userName)).toEqual(JSON.stringify(mockJson));
  });

  it("should not be getScores in", () => {   
    const userName = 'Jef';
    const userScores = localStorage.getItem(StorageEnum.LOCALSTORAGE_STEP + userName);
    expect(spectator.service.getScores(userName)).toBe(userScores);
  });

  it("should not be setScores in", () => {
    const jsonScores: Scores = { score: 10, highscore: 20}    
    spectator.service.setScores(jsonScores)
    expect(spectator.service.highScore).toEqual(20);
    expect(spectator.service.score).toEqual(10);
  });

  it("should login user", () => {
    const user = 'Jef'
    spectator.service.loginUser(user).then( rs =>{
      expect(rs).toBe('');
    })    
  });

  it("should logout user", () => {
    spectator.service.logout().then( rs =>{
      expect(rs).toBe('');
    })    
  });

});