import {RequestStatusPipe} from './request-status.pipe';
import {TutorSearchRequestStatus} from '../model/tutor-search-request.model';

describe('RequestStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Neu', () => {
    const pipe = new RequestStatusPipe();
    expect(pipe.transform(TutorSearchRequestStatus.NEW)).toBe('Neu');
  });

  it('should return MEDIATED', () => {
    const pipe = new RequestStatusPipe();
    expect(pipe.transform(TutorSearchRequestStatus.MEDIATED)).toBe('MEDIATED');
  });

  it('should return unknown status', () => {
    const pipe = new RequestStatusPipe();
    expect(pipe.transform('unknown' as any)).toBe('unknown status');
  });
});
