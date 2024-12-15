import { createServiceFactory, SpectatorService } from "@ngneat/spectator";

import { WalkService } from "./walk.service";

describe("WalkService", () => {
  let spectator: SpectatorService<WalkService>;
  const createService = createServiceFactory(WalkService);

  beforeEach(() => (spectator = createService()));

  it("should not be isAuth in", () => {
    expect(spectator.service.isAuth()).toBeFalsy();
  });
 
  it("should not be saveScores in", () => {
    expect(spectator.service.saveScores({score:0,highscore:0})).toBeFalsy();
  });

  it("should not be getScores in", () => {
    expect(spectator.service.getScores('test')).toBeFalsy();
  });

  it("should not be setScores in", () => {
    expect(spectator.service.setScores({score:4,highscore:4})).toBeFalsy();
  });

  it("should not be addScores in", () => {
    expect(spectator.service.addScores('test')).toBeFalsy();
  });

});