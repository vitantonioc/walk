import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { HeaderComponent } from "./header.component";

describe('Header Component', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory(HeaderComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('function onLogout', () => {
    let output;
    spectator.output('onLogout').subscribe((result:any) => 
      { 
      if(output = result)
        spectator.component.logout();
        expect(output).toEqual(true);
      }
    );    
  });

  it('should have a title_name class by span', () => {
    expect(spectator.query('span')).toHaveClass('title_name');
  });

});
