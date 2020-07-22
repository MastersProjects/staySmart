import {StatusPipe} from './status.pipe';
import {TutorStatus} from './model/tutor.model';

describe('StatusPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Neu', () => {
    const pipe = new StatusPipe();
    expect(pipe.transform(TutorStatus.NEW)).toBe('Neu');
  });

  it('should return Aktiv', () => {
    const pipe = new StatusPipe();
    expect(pipe.transform(TutorStatus.ACTIVATED)).toBe('Aktiv');
  });

  it('should return Deaktiviert', () => {
    const pipe = new StatusPipe();
    expect(pipe.transform(TutorStatus.DEACTIVATED)).toBe('Deaktiviert');
  });

  it('should return unknown status', () => {
    const pipe = new StatusPipe();
    expect(pipe.transform('unknown' as any)).toBe('unknown status');
  });
});
