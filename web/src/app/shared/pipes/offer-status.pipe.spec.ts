import {OfferStatusPipe} from './offer-status.pipe';
import {TutorSearchRequestOfferStatus} from '../model/tutor-search-request.model';

describe('OfferStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new OfferStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Neu', () => {
    const pipe = new OfferStatusPipe();
    expect(pipe.transform(TutorSearchRequestOfferStatus.NEW)).toBe('Neu');
  });

  it('should return Akzeptiert', () => {
    const pipe = new OfferStatusPipe();
    expect(pipe.transform(TutorSearchRequestOfferStatus.ACCEPTED)).toBe('Akzeptiert');
  });

  it('should return Abgelehnt', () => {
    const pipe = new OfferStatusPipe();
    expect(pipe.transform(TutorSearchRequestOfferStatus.DECLINED)).toBe('Abgelehnt');
  });

  it('should return unknown status', () => {
    const pipe = new OfferStatusPipe();
    expect(pipe.transform('unknown' as any)).toBe('unknown status');
  });
});
