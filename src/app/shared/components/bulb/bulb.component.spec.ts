import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BulbComponent } from "./bulb.component";

describe('Bulb Component', () => {
  let spectator: Spectator<BulbComponent>;
  const createComponent = createComponentFactory(BulbComponent);

  beforeEach(() => { 
    spectator = createComponent();  
    });  

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should have red bulbState', () => {
    const bulbState = spectator.component.bulbState;  
    expect(bulbState).toBe('red'); 
    });
});
