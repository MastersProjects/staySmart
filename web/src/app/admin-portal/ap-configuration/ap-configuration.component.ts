import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Subject} from 'rxjs';
import {Configuration} from '../../shared/model/configuration.model';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {AngularFirePerformance} from '@angular/fire/performance';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-ap-configuration',
  templateUrl: './ap-configuration.component.html',
  styleUrls: ['./ap-configuration.component.scss']
})
export class ApConfigurationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  newSubject: FormControl;
  newGradeLevel: FormControl;
  faTrash = faTrash;

  configuration: Configuration;

  constructor(private configurationService: ConfigurationService, private angularFirePerformance: AngularFirePerformance) {
  }

  ngOnInit(): void {
    this.configurationService.getConfigurationValueChanges().pipe(takeUntil(this.destroy$))
      .subscribe(configuration => {
        this.configuration = configuration;
      });
    this.createFormControls();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createFormControls(): void {
    this.newSubject = new FormControl(
      '',
      [Validators.required, this.configurationDuplicateValidator('subjects')]
    );
    this.newGradeLevel = new FormControl(
      '',
      [Validators.required, this.configurationDuplicateValidator('gradeLevels')]
    );
  }

  async submitNewSubject(subjects: string[] = []) {
    if (this.newSubject.valid) {
      const newSubjectTrace = await this.angularFirePerformance.trace('AP: newSubject');
      newSubjectTrace.start();
      this.configurationService.saveConfiguration({subjects: [...subjects, this.newSubject.value]})
        .then(() => {
          newSubjectTrace.putAttribute('newSubjectSuccessful', 'true');
          this.newSubject.reset();
        })
        .catch(() => newSubjectTrace.putAttribute('newSubjectSuccessful', 'false'))
        .finally(() => newSubjectTrace.stop());
    }
  }

  async submitNewGradeLevel(gradeLevels: string[] = []) {
    if (this.newGradeLevel.valid) {
      const newGradeLevelTrace = await this.angularFirePerformance.trace('AP: newGradeLevel');
      newGradeLevelTrace.start();
      this.configurationService.saveConfiguration({gradeLevels: [...gradeLevels, this.newGradeLevel.value]})
        .then(() => {
          newGradeLevelTrace.putAttribute('newGradeLevelSuccessful', 'true');
          this.newGradeLevel.reset();
        })
        .catch(() => newGradeLevelTrace.putAttribute('newGradeLevelSuccessful', 'false'))
        .finally(() => newGradeLevelTrace.stop());
    }
  }

  async removeSubject(subject: string, subjects: string[]) {
    const removeSubjectTrace = await this.angularFirePerformance.trace('AP: removeSubject');
    removeSubjectTrace.start();
    this.configurationService.saveConfiguration({subjects: subjects.filter(value => value !== subject)})
      .then(() => removeSubjectTrace.putAttribute('removeSubjectSuccessful', 'true'))
      .catch(() => removeSubjectTrace.putAttribute('removeSubjectSuccessful', 'false'))
      .finally(() => removeSubjectTrace.stop());
  }

  async removeGradeLevel(gradeLevel: string, gradeLevels: string[]) {
    const removeGradeLevelTrace = await this.angularFirePerformance.trace('AP: removeGradeLevel');
    removeGradeLevelTrace.start();
    this.configurationService.saveConfiguration({gradeLevels: gradeLevels.filter(value => value !== gradeLevel)})
      .then(() => removeGradeLevelTrace.putAttribute('removeGradeLevelSuccessful', 'true'))
      .catch(() => removeGradeLevelTrace.putAttribute('removeGradeLevelSuccessful', 'false'))
      .finally(() => removeGradeLevelTrace.stop());
  }

  private configurationDuplicateValidator = (configuration: 'subjects' | 'gradeLevels'): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.configuration?.[configuration]) {
        return null;
      }
      const duplicate = this.configuration[configuration]
        .find(item => item.toLocaleLowerCase() === control.value.toLocaleLowerCase());
      return duplicate ? {duplicate: true} : null;
    };
  }
}

