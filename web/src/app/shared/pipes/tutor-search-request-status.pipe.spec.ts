import {TutorSearchRequestStatusPipe} from './tutor-search-request-status.pipe';
import {TutorSearchRequestStatus} from '../model/tutor-search-request.model';

describe('TutorSearchRequestStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TutorSearchRequestStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Neu', () => {
    const pipe = new TutorSearchRequestStatusPipe();
    expect(pipe.transform(TutorSearchRequestStatus.NEW)).toBe('Neu');
  });

  it('should return MEDIATED', () => {
    const pipe = new TutorSearchRequestStatusPipe();
    expect(pipe.transform(TutorSearchRequestStatus.MEDIATED)).toBe('MEDIATED');
  });

  it('should return unknown status', () => {
    const pipe = new TutorSearchRequestStatusPipe();
    expect(pipe.transform('unknown' as any)).toBe('unknown status');
  });
});
