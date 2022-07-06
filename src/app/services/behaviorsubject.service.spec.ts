import { TestBed } from '@angular/core/testing';

import { BehaviorsubjectService } from './behaviorsubject.service';

describe('BehaviorsubjectService', () => {
  let service: BehaviorsubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaviorsubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
