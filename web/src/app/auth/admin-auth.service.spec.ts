import {TestBed} from '@angular/core/testing';

import {AdminAuthService} from './admin-auth.service';
import {TestingModule} from '../testing/testing.module';

describe('AdminAuthService', () => {
  let service: AdminAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
    });
    service = TestBed.inject(AdminAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
