import { createServiceFactory, SpectatorService } from "@ngneat/spectator";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let spectator: SpectatorService<AuthGuard>;
  const createService = createServiceFactory(AuthGuard);

  beforeEach(() => (spectator = createService()));

  it("should not be canLoad in", () => {
    spectator.service.canLoad().subscribe( val =>{
        expect(val).toBeTrue()
    })
  });

});