import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../../shared/services/configuration.service';
import {Observable} from 'rxjs';
import {Configuration} from '../../shared/model/configuration.model';
import {FormControl, Validators} from '@angular/forms';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {AngularFirePerformance} from '@angular/fire/performance';

@Component({
  selector: 'app-ap-configuration',
  templateUrl: './ap-configuration.component.html',
  styleUrls: ['./ap-configuration.component.scss']
})
export class ApConfigurationComponent implements OnInit {

  configuration$: Observable<Configuration>;

  newSubject: FormControl;
  newGradeLevel: FormControl;
  faTrash = faTrash;

  constructor(private configurationService: ConfigurationService, private angularFirePerformance: AngularFirePerformance) {
  }

  ngOnInit(): void {
    this.configuration$ = this.configurationService.getConfigurationValueChanges();
    this.newSubject = new FormControl('', Validators.required);
    this.newGradeLevel = new FormControl('', Validators.required);
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

  isDuplicatedInArray(item: string, array: string[]) {
    return array ? !!array.find(subject => subject.toLocaleLowerCase() === item.toLocaleLowerCase()) : false;
  }
}
