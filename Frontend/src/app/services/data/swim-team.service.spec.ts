import { TestBed } from '@angular/core/testing';

import { SwimTeamService } from './swim-team.service';

describe('SwimTeamService', () => {
  let service: SwimTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwimTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
