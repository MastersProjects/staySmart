import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ApTutorStatusComponent} from './ap-tutor-status.component';
import {TutorStatus} from '../../../shared/model/tutor.model';
import {TutorStatusPipe} from '../../../shared/pipes/tutor-status.pipe';

describe('ApTutorStatusComponent', () => {
  let component: ApTutorStatusComponent;
  let fixture: ComponentFixture<ApTutorStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ApTutorStatusComponent,
        TutorStatusPipe,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed
      .overrideComponent(ApTutorStatusComponent, {set: {host: {'(click)': 'dummy'}}}) // Workaround for detectChange in onPush Component
      .createComponent(ApTutorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('statusClass', () => {
    it('should return badge-primary on new', () => {
      component.status = TutorStatus.NEW;
      detectChanges();
      expect(component.statusClass).toEqual(
        {
          'badge-primary': true,
          'badge-success': false,
          'badge-danger': false,
        }
      );
      expect(fixture.nativeElement.querySelector('span').classList).toContain('badge-primary');
    });

    it('should return badge-success on activated', () => {
      component.status = TutorStatus.ACTIVATED;
      detectChanges();
      expect(component.statusClass).toEqual(
        {
          'badge-primary': false,
          'badge-success': true,
          'badge-danger': false,
        }
      );
      expect(fixture.nativeElement.querySelector('span').classList).toContain('badge-success');
    });

    it('should return badge-danger on deactivated', () => {
      component.status = TutorStatus.DEACTIVATED;
      detectChanges();
      expect(component.statusClass).toEqual(
        {
          'badge-primary': false,
          'badge-success': false,
          'badge-danger': true,
        }
      );
      expect(fixture.nativeElement.querySelector('span').classList).toContain('badge-danger');
    });
  });

  // Workaround for detectChange in onPush Component
  const detectChanges = () => {
    fixture.debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
  };
});
