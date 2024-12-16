import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { WalkComponent } from "./walk.component";
import { WalkService } from '../../services/walk.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('WalkComponent Component', () => {
  let spectator: Spectator<WalkComponent>;
  let walkService = new WalkService;
  let router: Router;
  const log = console.log; 
  const createComponent = createComponentFactory({
    component: WalkComponent,
    imports:[
      RouterTestingModule,
    ],
    providers: [
      { provide: WalkService }
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
  });

  beforeEach(() => { 
    spectator = createComponent();
    walkService = new WalkService();});

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('function ngOnInit', () => {
    spectator.component.ngOnInit();
  });

  it('function getTimeToRed', () => {
    spectator.component.score = 0;
    spectator.component.timeCountDown = 30;
    spectator.component.timerSub.unsubscribe()
    let result = spectator.component.startTimer();
    spectator.component.timer$.subscribe((rs) =>{
      expect(rs).toBe(20)!;
       }     
    )
    expect(result).toHaveLength(0);
  });

  it('function logout', () => {
    spectator.component.logout();
    walkService.logout().catch( () =>{
      expect(router!.navigateByUrl('')).toBeTruthy()!;
    }) 
  }); 

  it('function sendEvent', () => {
    const event =  'Left';
    spectator.component.sendEvent(event);     
    spectator.component.newStep = event
    spectator.component.highScore = 20;
    spectator.component.bulbState = 'green';
    walkService.saveScores({highscore : 20, score:10});
    spectator.component.startTimer()
    spectator.component.timer$.subscribe((rs) =>{
      expect(rs).toBeTruthy()!;
       }     
    )
    spectator.component.bulbState = 'red';
    spectator.component.sendEvent(event);     
    expect(spectator.component.score).toBe(0)
  }); 
});