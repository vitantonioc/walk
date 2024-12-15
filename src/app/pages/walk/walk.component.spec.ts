import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { WalkComponent } from "./walk.component";
import { WalkService } from '../../services/walk.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('WalkComponent Component', () => {
  let spectator: Spectator<WalkComponent>;
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

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('function ngOnInit', () => {
    spectator.component.ngOnInit();
  });

  it('function getTimeToRed', () => {
    spectator.component.score = 0;
    let result = spectator.component.startTimer();
    expect(result).toHaveLength(0);
  });

  it('function getTimeToRed', () => {
    spectator.component.score = 0;
    let result = spectator.component.startTimer();
    expect(result).toHaveLength(0);
  });

  it('function getRandom', () => {
    let result = spectator.component.getRandom(0, 10);
    expect(result).toBeGreaterThan(0);
  });
});