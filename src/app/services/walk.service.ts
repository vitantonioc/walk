import { Injectable } from '@angular/core';
import { CurrentUserEnum } from '../../core/enum/currentUser.enum';
import { StorageEnum } from '../../core/enum/storageEnum.enum';
import { Scores } from '../../core/interfaces/scores.interface';
import { MapValue } from '../../core/models/mapValue.model';


@Injectable({
  providedIn: 'root'
})
export class WalkService {

 public userName: string = '';
 public score: number = 0;
 public highScore: number = 0;

  constructor() {}

  isAuth(): boolean {   
    const currentUser: string | null = localStorage.getItem(StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER);
    if (currentUser) {
      this.userName = currentUser;
      return !!this.getScores(currentUser);
    }
    return false;
  } 

  saveScores(scoresObj: Scores) {
    localStorage.setItem(StorageEnum.LOCALSTORAGE_STEP + this.userName, JSON.stringify(scoresObj));
  }

  getScores(userName: string) {
    const userScores = localStorage.getItem(StorageEnum.LOCALSTORAGE_STEP + userName);
    if (userScores) {
      this.setScores(JSON.parse(userScores));
    }
    return userScores;
  }

  setScores(jsonScores: Scores) {
    this.score = jsonScores.score;
    this.highScore = jsonScores.highscore;
  }

  addScores(userName: string) {
    const newUser = new MapValue(0, 0);
    localStorage.setItem(StorageEnum.LOCALSTORAGE_STEP + userName, JSON.stringify({...newUser}));
    this.getScores(userName);
  }

  loginUser(userName: string) {
    const userScores = this.getScores(userName);
    if (!userScores) {
      this.addScores(userName);
    }
    return new Promise((resolve) => {
      this.userName = userName;
      localStorage.setItem(StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER, userName);
      resolve('');
    });
  }

  logout() {
    return new Promise((resolve) => {
      localStorage.removeItem(StorageEnum.LOCALSTORAGE_STEP + CurrentUserEnum.CURRENT_USER);
      resolve('');
    });
  }

}
