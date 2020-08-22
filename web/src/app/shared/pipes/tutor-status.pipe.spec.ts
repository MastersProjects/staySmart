import {TutorStatusPipe} from './tutor-status.pipe';
import {TutorStatus} from '../model/tutor.model';

describe('TutorStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TutorStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Neu', () => {
    const pipe = new TutorStatusPipe();
    expect(pipe.transform(TutorStatus.NEW)).toBe('Neu');
  });

  it('should return Aktiv', () => {
    const pipe = new TutorStatusPipe();
    expect(pipe.transform(TutorStatus.ACTIVATED)).toBe('Aktiv');
  });

  it('should return Deaktiviert', () => {
    const pipe = new TutorStatusPipe();
    expect(pipe.transform(TutorStatus.DEACTIVATED)).toBe('Deaktiviert');
  });

  it('should return unknown status', () => {
    const pipe = new TutorStatusPipe();
    expect(pipe.transform('unknown' as any)).toBe('unknown status');
  });
});
