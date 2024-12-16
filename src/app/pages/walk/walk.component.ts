import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { WalkService } from '../../services/walk.service';
import { finalize, map, Observable, share, Subscription, take, timer } from 'rxjs';
import { GetWalkValues } from '../../../core/enum/currentUser.enum';

@Component({
  selector: 'app-walk',
  templateUrl: './walk.component.html',
  styleUrls: ['./walk.component.css']
})
export class WalkComponent implements OnInit , OnDestroy{

 public userName: string = '';
 public highScore: number = 0;
 public score: number = 0;
 public bulbState: string = GetWalkValues.RED;
 public newStep: string = GetWalkValues.LEFT;

 timeCountDown: number = 100;
 initialTimeCountDown : boolean = true;

 timer$!: Observable<number>;
 timerSub!: Subscription;

 private time: any;

  constructor(
    private walkServices: WalkService,
    private router: Router
  ) {
    this.userName = this.walkServices.userName;
    this.highScore = this.walkServices.highScore;
    this.score = this.walkServices.score;
  }
  ngOnDestroy(): void {
    this.timerSub.unsubscribe()
  }

  /**
   * Function for user logout
   */
  logout() {
    this.walkServices.logout().then( ()=> {
      this.router.navigateByUrl('');
    });
  }

  ngOnInit() {
    this.startWalk();
    this.startTimer();
  }

  /**
   * Data initialization
   */
  sendEvent(step: string) { 
    this.bulbState === GetWalkValues.GREEN ? this.getSendEvent(step) : this.score = 0;   
  }

   /**
   * Data initialization and start timer
   */
   getSendEvent(step: string): void {   
    this.newStep === step ? this.score++ : this.score > 0 ? this.score-- : null;
    this.highScore < this.score  ? this.highScore = this.score :null;
    this.bulbState === GetWalkValues.GREEN ? this.checkGreenLight(): null;
    this.newStep === GetWalkValues.LEFT ? this.newStep = GetWalkValues.RIGHT : this.newStep = GetWalkValues.LEFT;
    this.walkServices.saveScores({
      highscore: this.highScore,
      score: this.score
    });
    this.startTimer();
  }  

   /**
   * Start Timer with calculation observable and restart same timer when countdown run
   */
  startTimer()  {  
   this.initialTimeCountDown === false ? this.timeCountDown > 20 ? this.timeCountDown = this.timeCountDown - 10 : this.timeCountDown : this.initialTimeCountDown = false;   
    this.timerSub && this.timerSub.unsubscribe();
    this.timer$ = timer(0, 100).pipe(
      map(i => {
      (this.timeCountDown - i)=== 0 ? this.startWalk(): null;
      let timeReturn: number = 0;
      if(this.time !== undefined)
        timeReturn = (this.timeCountDown - i) - (this.time/10)   
      else
        timeReturn = (this.timeCountDown - i)
        return timeReturn;
      }),
      take(this.timeCountDown + 1),
      finalize(() => { }),
      share()
    );
    this.timerSub = this.timer$.subscribe();
  }

   /**
   * Start function walk
   */
  startWalk() {
    this.bulbState = GetWalkValues.RED;
   timer(3000).pipe( 
      map( ()=> this.bulbState = GetWalkValues.GREEN))
      .subscribe(() => {
      this.checkGreenLight();
    });
  }

    /**
   * Defer data for this.tim
   */
  checkGreenLight() { 
    const checkRandomValue = Math.max(10000 - this.score * 100, 2000) + this.getRandom(-1500, 1500);
    this.time = (checkRandomValue/100).toFixed(0);
  }

  /**
   * Function random number time
   */
  getRandom(min: number, max: number) {
    const getRandomValue = (Math.random() * (max - min)) + min;
    return getRandomValue;
  }
}
