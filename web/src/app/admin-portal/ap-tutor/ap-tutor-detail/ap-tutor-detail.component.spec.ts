import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ApTutorDetailComponent} from './ap-tutor-detail.component';
import {AdminPortalService} from '../../shared/admin-portal.service';
import {TestingModule} from '../../../testing/testing.module';
import {Observable, of, throwError} from 'rxjs';
import {TutorStatus} from '../../../shared/model/tutor.model';
import {FormControl} from '@angular/forms';
import {AngularFirePerformance} from '@angular/fire/performance';
import {TraceMock} from '../../../testing/angular-fire-performance-mock';

describe('ApTutorDetailComponent', () => {
  let component: ApTutorDetailComponent;
  let fixture: ComponentFixture<ApTutorDetailComponent>;
  let adminPortalService: AdminPortalService;
  let angularFirePerformance: AngularFirePerformance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApTutorDetailComponent],
      imports: [
        TestingModule,
      ],
      providers: [AdminPortalService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApTutorDetailComponent);
    component = fixture.componentInstance;
    adminPortalService = TestBed.inject(AdminPortalService);
    angularFirePerformance = TestBed.inject(AngularFirePerformance);
    spyOn(angularFirePerformance, 'trace').and.returnValue(of(new TraceMock() as any).toPromise());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('activateTutor', () => {
    it('should activate Tutor', fakeAsync(() => {
      component.tutorDetail = {firstName: 'Ben'} as any;
      spyOn(adminPortalService, 'activateTutor').and.returnValue(of<void>().toPromise());
      component.activateTutor();
      tick();
      expect(adminPortalService.activateTutor).toHaveBeenCalledWith({firstName: 'Ben'} as any);
    }));

    it('should activate Tutor and catch error', fakeAsync(() => {
      component.tutorDetail = {firstName: 'Ben'} as any;
      spyOn(adminPortalService, 'activateTutor').and.returnValue(throwError('error').toPromise());
      component.activateTutor();
      tick();
      expect(adminPortalService.activateTutor).toHaveBeenCalledWith({firstName: 'Ben'} as any);
    }));
  });

  describe('changeStatus', () => {
    it('should changeStatus to activated', fakeAsync(() => {
      component.tutorDetail = {uid: 'uid'} as any;
      spyOn(adminPortalService, 'changeTutorStatus').and.returnValue(of<void>().toPromise());
      component.changeStatus({target: {checked: true}} as any);
      tick();
      expect(adminPortalService.changeTutorStatus).toHaveBeenCalledWith(TutorStatus.ACTIVATED, 'uid');
    }));

    it('should changeStatus to deactivated', fakeAsync(() => {
      component.tutorDetail = {uid: 'uid'} as any;
      spyOn(adminPortalService, 'changeTutorStatus').and.returnValue(of<void>().toPromise());
      component.changeStatus({target: {checked: false}} as any);
      tick();
      expect(adminPortalService.changeTutorStatus).toHaveBeenCalledWith(TutorStatus.DEACTIVATED, 'uid');
    }));

    it('should changeStatus and catch error', fakeAsync(() => {
      component.tutorDetail = {uid: 'uid'} as any;
      spyOn(adminPortalService, 'changeTutorStatus').and.returnValue(throwError('error').toPromise());
      component.changeStatus({target: {checked: true}} as any);
      tick();
      expect(adminPortalService.changeTutorStatus).toHaveBeenCalledWith(TutorStatus.ACTIVATED, 'uid');
    }));
  });

  describe('changeVerification', () => {
    it('should changeVerification to true', fakeAsync(() => {
      component.tutorDetail = {uid: 'uid'} as any;
      spyOn(adminPortalService, 'changeTutorVerification').and.returnValue(of<void>().toPromise());
      component.changeVerification({target: {checked: true}} as any);
      tick();
      expect(adminPortalService.changeTutorVerification).toHaveBeenCalledWith(true, {uid: 'uid'} as any);
    }));

    it('should changeVerification to false', fakeAsync(() => {
      component.tutorDetail = {uid: 'uid'} as any;
      spyOn(adminPortalService, 'changeTutorVerification').and.returnValue(of<void>().toPromise());
      component.changeVerification({target: {checked: false}} as any);
      tick();
      expect(adminPortalService.changeTutorVerification).toHaveBeenCalledWith(false, {uid: 'uid'} as any);
    }));

    it('should changeVerification and catch error', fakeAsync(() => {
      component.tutorDetail = {uid: 'uid'} as any;
      spyOn(adminPortalService, 'changeTutorVerification').and.returnValue(throwError('error').toPromise());
      component.changeVerification({target: {checked: true}} as any);
      tick();
      expect(adminPortalService.changeTutorVerification).toHaveBeenCalledWith(true, {uid: 'uid'} as any);
    }));
  });

  describe('FormControl getters', () => {
    [
      'firstName',
      'lastName',
      'email',
      'mobileNumber',
      'birthday',
      'streetAddress',
      'postalCode',
      'city',
      'subjects',
      'gradeLevels',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
      'price',
    ].forEach(name => {
      describe(name, () => {
        it(`should return ${name} FormControl`, () => {
          const formControl = component[name];
          expect(formControl instanceof FormControl).toBeTruthy();
          expect(formControl.value).toBeFalsy();
        });
      });
    });
  });

  describe('searchLocation', () => {
    it('should return Observable', () => {
      const searchLocation = component.searchLocation();
      expect(searchLocation instanceof Observable).toBeTruthy();
      searchLocation.subscribe(response => {
        expect(response).toEqual([]);
      });
    });
  });

  describe('locationFormatterForm', () => {
    it('should return label if defined', () => {
      expect(component.locationFormatterForm({label: 'label'} as any)).toEqual('label');
    });

    it('should return null if undefined', () => {
      console.log(component.locationFormatterForm({} as any));
      expect(component.locationFormatterForm({} as any)).toEqual(null);
    });
  });
});
