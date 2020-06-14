import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BirthdayInputComponent} from './birthday-input.component';
import * as firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

describe('BirthdayInputComponent', () => {
  let component: BirthdayInputComponent;
  let fixture: ComponentFixture<BirthdayInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BirthdayInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthdayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return on yearOptions', () => {
    const yearOptions = component.yearOptions;
    const expectedOptionLength = new Date().getFullYear() - 1900;
    expect(yearOptions.length).toBe(new Date().getFullYear() - 1900 + 1);
    expect(yearOptions[0]).toBe(new Date().getFullYear());
    expect(yearOptions[expectedOptionLength]).toBe(1900);
  });

  it('should return 31 days on yearOptions may', () => {
    component.day.setValue(6);
    component.month.setValue(4); // may
    component.year.setValue(1998);

    const dayOptions = component.dayOptions;
    expect(dayOptions.length).toBe(31);
    expect(dayOptions[0]).toBe(1);
    expect(dayOptions[30]).toBe(31);
  });

  it('should return 30 days on dayOptions june', () => {
    component.day.setValue(6);
    component.month.setValue(5); // june
    component.year.setValue(1998);

    const dayOptions = component.dayOptions;
    expect(dayOptions.length).toBe(30);
    expect(dayOptions[0]).toBe(1);
    expect(dayOptions[29]).toBe(30);
  });

  it('should set day to 1 on checkMonthDays june', () => {
    component.day.setValue(31);
    component.month.setValue(4); // may
    component.year.setValue(1998);

    expect(component.day.value).toBe(31);

    component.month.setValue(5); // may

    component.checkMonthDays();

    expect(component.day.value).toBe(1);
  });

  it('should return day FormControl', () => {
    component.birthdayForm.get('day').setValue(6);
    const day = component.day;

    expect(typeof day).toBe('object');
    expect(day.value).toBe(6);
  });

  it('should return month FormControl', () => {
    component.birthdayForm.get('month').setValue(5);
    const month = component.month;

    expect(typeof month).toBe('object');
    expect(month.value).toBe(5);
  });

  it('should return year FormControl', () => {
    component.birthdayForm.get('year').setValue(1998);
    const year = component.year;

    expect(typeof year).toBe('object');
    expect(year.value).toBe(1998);
  });

  it('should writeValue', () => {
    component.writeValue(new Timestamp(897084000, 0));

    expect(component.day.value).toBe(6);
    expect(component.month.value).toBe(5);
    expect(component.year.value).toBe(1998);
  });

  it('should disable birthdayForm', () => {
    expect(component.birthdayForm.disabled).toBeFalsy();

    component.setDisabledState(true);

    expect(component.birthdayForm.disabled).toBeTruthy();
  });

  it('should enable birthdayForm', () => {
    component.birthdayForm.disable();

    expect(component.birthdayForm.disabled).toBeTruthy();

    component.setDisabledState(false);

    expect(component.birthdayForm.disabled).toBeFalsy();
  });

  it('should be valid birthdayForm', () => {
    component.day.setValue(6);
    component.month.setValue(5); // june
    component.year.setValue(1998);

    expect(component.validate()).toBeNull();
  });

  it('should be invalid birthdayForm', () => {
    component.day.setValue(6);
    component.year.setValue(1998);

    expect(component.validate()).toEqual({birthdayRequired: true});
  });
});
