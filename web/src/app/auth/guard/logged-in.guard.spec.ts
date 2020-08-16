import {inject, TestBed} from '@angular/core/testing';

import {LoggedInGuard} from './logged-in.guard';
import {TestingModule} from '../../testing/testing.module';

describe('LoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      providers: [LoggedInGuard]
    });
  });

  it('should ...', inject([LoggedInGuard], (guard: LoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
