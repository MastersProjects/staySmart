import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {ApConfigurationComponent} from './ap-configuration.component';
import {TestingModule} from '../../testing/testing.module';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {of, throwError} from 'rxjs';

describe('ApConfigurationComponent', () => {
  let component: ApConfigurationComponent;
  let fixture: ComponentFixture<ApConfigurationComponent>;
  let configurationService: ConfigurationService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestingModule,
      ],
      declarations: [ApConfigurationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApConfigurationComponent);
    component = fixture.componentInstance;
    configurationService = TestBed.inject(ConfigurationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submitNewSubject()', () => {
    it('should submit new Subject on valid', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());
      spyOn(component.newSubject, 'reset');
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };
      component.newSubject.setValue('Subject3');

      component.submitNewSubject(component.configuration.subjects);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {subjects: ['Subject1', 'Subject2', 'Subject3']}
      );
      expect(component.newSubject.reset).toHaveBeenCalled();
    }));

    it('should submit first new Subject on valid', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());
      spyOn(component.newSubject, 'reset');
      component.configuration = {
        subjects: undefined,
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };
      component.newSubject.setValue('Subject3');

      component.submitNewSubject(component.configuration.subjects);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {subjects: ['Subject3']}
      );
      expect(component.newSubject.reset).toHaveBeenCalled();
    }));

    it('should submit new Subject on valid and catch error', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(throwError('error').toPromise());
      spyOn(component.newSubject, 'reset');
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: undefined,
      };
      component.newSubject.setValue('Subject3');

      component.submitNewSubject(component.configuration.subjects);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {subjects: ['Subject1', 'Subject2', 'Subject3']}
      );
      expect(component.newSubject.reset).not.toHaveBeenCalled();
    }));

    it('should not submit new Subject on invalid', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());
      spyOn(component.newSubject, 'reset');
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };
      component.newSubject.setValue('');

      component.submitNewSubject(component.configuration.subjects);
      tick(10);

      expect(configurationService.saveConfiguration).not.toHaveBeenCalledWith(
        {subjects: ['Subject1', 'Subject2', 'Subject3']}
      );
      expect(component.newSubject.reset).not.toHaveBeenCalled();
    }));
  });

  describe('submitNewGradeLevel()', () => {
    it('should submit new GradeLevel on valid', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());
      spyOn(component.newGradeLevel, 'reset');
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };
      component.newGradeLevel.setValue('GradeLevel3');

      component.submitNewGradeLevel(component.configuration.gradeLevels);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {gradeLevels: ['GradeLevel1', 'GradeLevel2', 'GradeLevel3']}
      );
      expect(component.newGradeLevel.reset).toHaveBeenCalled();
    }));

    it('should submit first new GradeLevel on valid', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());
      spyOn(component.newGradeLevel, 'reset');
      component.configuration = {
        subjects: undefined,
        gradeLevels: undefined,
      };
      component.newGradeLevel.setValue('GradeLevel3');

      component.submitNewGradeLevel(component.configuration.gradeLevels);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {gradeLevels: ['GradeLevel3']}
      );
      expect(component.newGradeLevel.reset).toHaveBeenCalled();
    }));

    it('should submit new GradeLevel on valid and catch error', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(throwError('error').toPromise());
      spyOn(component.newGradeLevel, 'reset');
      component.configuration = {
        subjects: undefined,
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };
      component.newGradeLevel.setValue('GradeLevel3');

      component.submitNewGradeLevel(component.configuration.gradeLevels);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {gradeLevels: ['GradeLevel1', 'GradeLevel2', 'GradeLevel3']}
      );
      expect(component.newGradeLevel.reset).not.toHaveBeenCalled();
    }));

    it('should not submit new GradeLevel on invalid', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());
      spyOn(component.newGradeLevel, 'reset');
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };
      component.newGradeLevel.setValue('');

      component.submitNewGradeLevel(component.configuration.gradeLevels);
      tick(10);

      expect(configurationService.saveConfiguration).not.toHaveBeenCalledWith(
        {gradeLevels: ['GradeLevel1', 'GradeLevel2', 'GradeLevel3']}
      );
      expect(component.newGradeLevel.reset).not.toHaveBeenCalled();
    }));
  });

  describe('removeSubject()', () => {
    it('should remove Subject', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());

      component.removeSubject('Subject2', ['Subject1', 'Subject2', 'Subject3']);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {subjects: ['Subject1', 'Subject3']}
      );
    }));

    it('should remove Subject and catch error', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(throwError('error').toPromise());

      component.removeSubject('Subject2', ['Subject1', 'Subject2', 'Subject3']);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {subjects: ['Subject1', 'Subject3']}
      );
    }));
  });

  describe('removeGradeLevel()', () => {
    it('should remove GradeLevel', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(of({}).toPromise());

      component.removeGradeLevel('GradeLevel2', ['GradeLevel1', 'GradeLevel2', 'GradeLevel3']);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {gradeLevels: ['GradeLevel1', 'GradeLevel3']}
      );
    }));

    it('should remove GradeLevel and catch error', fakeAsync(() => {
      spyOn(configurationService, 'saveConfiguration').and.returnValue(throwError('error').toPromise());

      component.removeGradeLevel('GradeLevel2', ['GradeLevel1', 'GradeLevel2', 'GradeLevel3']);
      tick(10);

      expect(configurationService.saveConfiguration).toHaveBeenCalledWith(
        {gradeLevels: ['GradeLevel1', 'GradeLevel3']}
      );
    }));
  });

  describe('configurationDuplicateValidator()', () => {
    it('should return ValidationErrors on duplication', () => {
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };

      component.newSubject.setValue('Subject2');
      const result = (component as any).configurationDuplicateValidator('subjects')(component.newSubject);

      expect(result).toEqual({duplicate: true});
    });

    it('should return ValidationErrors on duplication gradeLevels', () => {
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };

      component.newGradeLevel.setValue('GradeLevel2');
      const result = (component as any).configurationDuplicateValidator('gradeLevels')(component.newGradeLevel);

      expect(result).toEqual({duplicate: true});
    });

    it('should return null on no duplication', () => {
      component.configuration = {
        subjects: ['Subject1', 'Subject2'],
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };

      component.newSubject.setValue('Subject3');
      const result = (component as any).configurationDuplicateValidator('subjects')(component.newSubject);

      expect(result).toBeNull();
    });

    it('should return null on configuration undefined', () => {
      component.configuration = undefined;

      component.newSubject.setValue('Subject3');
      const result = (component as any).configurationDuplicateValidator('subjects')(component.newSubject);

      expect(result).toBeNull();
    });

    it('should return null on configuration property undefined', () => {
      component.configuration = {
        subjects: undefined,
        gradeLevels: ['GradeLevel1', 'GradeLevel2'],
      };

      component.newSubject.setValue('Subject3');
      const result = (component as any).configurationDuplicateValidator('subjects')(component.newSubject);

      expect(result).toBeNull();
    });
  });
});
