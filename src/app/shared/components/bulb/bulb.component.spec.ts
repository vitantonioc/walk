import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BulbComponent } from "./bulb.component";

describe('HeaderGame Component', () => {
  let spectator: Spectator<BulbComponent>;
  const createComponent = createComponentFactory(BulbComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
