import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ButtonComponent } from "./button.component";

describe('Button Component', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory(ButtonComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should have a btn btn-primary btn-lg class by button', () => {
    expect(spectator.query('button')).toHaveClass('btn btn-primary btn-lg');
  });

  it('getter textButton', () => {
    spectator.component.modeButton = "left";
    expect(spectator.component.textButton).toEqual("LEFT");
  });

 /* it('function clickBtn', () => {
    let output;
    
    spectator.detectChanges();
    spectator.component.modeButton = "left";  

    spectator.output('clickBtn').subscribe((result:any) => 
      {
        if(output = result)
          spectator.component.clickBtn('left');
          expect(output).toEqual('left');
      });
  }); */

});