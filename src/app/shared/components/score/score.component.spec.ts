import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ScoreComponent } from "./score.component";

describe('Score Component', () => {
  let spectator: Spectator<ScoreComponent>;
  const createComponent = createComponentFactory(ScoreComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
