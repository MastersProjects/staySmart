import {ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as moment from 'moment';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-birthday-input',
  templateUrl: './birthday-input.component.html',
  styleUrls: ['./birthday-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BirthdayInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BirthdayInputComponent),
      multi: true
    }
  ]
})
export class BirthdayInputComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private onDestroy$ = new Subject<void>();

  birthdayForm = new FormGroup({
    day: new FormControl('', Validators.required),
    month: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required)
  });

  monthOptions = moment.months();

  constructor() {
  }

  ngOnInit(): void {
    this.handleBirthdayFormChange();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private handleBirthdayFormChange(): void {
    this.birthdayForm.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(change => {
      const firestoreTimestamp = Timestamp.fromDate(new Date(change.year, change.month, change.day));
      this.onTouched();
      this.onChange(this.birthdayForm.valid ? firestoreTimestamp : null);
    });
  }

  get yearOptions(): number[] {
    const startYear = 1900;
    let currentYear = new Date().getFullYear();
    const years = [];
    while (startYear <= currentYear) {
      years.push(currentYear--);
    }
    return years;
  }

  get dayOptions(): number[] {
    const days = [];
    const formMonth = this.month.value;
    const formYear = this.year.value;
    const selectedMonth = formMonth ? parseInt(formMonth, 10) : new Date().getMonth();
    const selectedYear = formYear ? formYear : new Date().getFullYear();
    const daysCount = moment(`${selectedMonth + 1} ${selectedYear}`, 'MM YYYY').daysInMonth();
    for (let i = 1; i <= daysCount; i++) {
      days.push(i);
    }
    return days;
  }

  checkMonthDays(): void {
    const formDay = this.day.value;
    const formMonth = this.month.value;
    const formYear = this.year.value;
    const selectedMonth = formMonth ? parseInt(formMonth, 10) : new Date().getMonth();
    const selectedYear = formYear ? formYear : new Date().getFullYear();
    const daysCount = moment(`${selectedMonth + 1} ${selectedYear}`, 'MM YYYY').daysInMonth();
    if (formDay > daysCount) {
      this.day.setValue(1);
    }
  }

  get day(): FormControl {
    return this.birthdayForm.get('day') as FormControl;
  }

  get month(): FormControl {
    return this.birthdayForm.get('month') as FormControl;
  }

  get year(): FormControl {
    return this.birthdayForm.get('year') as FormControl;
  }

  // Accessor Functions Start

  writeValue(birthday: Timestamp): void {
    if (birthday) {
      const birthdayDate = birthday.toDate();
      this.birthdayForm.patchValue(
        {
          day: birthdayDate.getDate(),
          month: birthdayDate.getMonth(),
          year: birthdayDate.getFullYear()
        }
      );
    }
  }

  registerOnChange = (fn: any): void => this.onChange = fn;

  // @ts-ignore
  private onChange = (birthday: Timestamp): void => null;

  registerOnTouched = (fn: any): void => this.onTouched = fn;

  private onTouched = (): void => null;

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.birthdayForm.disable() : this.birthdayForm.enable();
  }

  validate(): ValidationErrors | null {
    return this.birthdayForm.valid ? null : {birthdayRequired: true};
  }

  // Accessor Functions End

}
