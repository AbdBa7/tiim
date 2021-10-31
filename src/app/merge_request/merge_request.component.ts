import { Component, OnInit, ViewChildren } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import {  MatChipList } from '@angular/material/chips';
import {  MatCheckbox } from '@angular/material/checkbox';


/**
 * Initilialize calendar in the filter
 */
 export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-merge_request',
  templateUrl: './merge_request.component.html',
  providers: [
    // { provide: DateAdapter, userClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: DateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MergeRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
