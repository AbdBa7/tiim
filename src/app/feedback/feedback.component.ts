import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

import {  MatChipList } from '@angular/material/chips';
import {  MatCheckbox } from '@angular/material/checkbox';

// import { default as _rollupMoment } from 'moment';
// import * as _moment from 'moment';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormControl } from '@angular/forms';
import { SidenavService } from '../service/service-shared';


/**
 * Moment package for date management
 */

// const moment = _rollupMoment || _moment;

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
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  providers: [
    // { provide: DateAdapter, userClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: DateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FeedbackComponent implements OnInit {

  /**
   * Get all tags chips in filter
   */
  @ViewChildren(MatChipList) flagList: any;

  /**
   * Get all tags checkbox in filter
   */
  @ViewChildren(MatCheckbox) cbList: any;

  expand = false;

  /**
   *
   * @param CommonService Constructor
   */
  constructor(private sidenav: SidenavService) {}
  
    /**
     * Initialisation of the news loading
     */
  ngOnInit() {
    // this.getAllLabels();
    // this.getUser();
    this.expand = true
    console.log(this.expand)

  }

  toggleRightSidenav(pan: any) {
    this.sidenav.toggle();
  }

  /**
   * Free text filter
   */
  filter= "";
  status_list = ['Pending', 'Ongoing', 'Closed']

  sort_like_list = ['Increasing', 'Decreasing', 'Cancel']
  sort_user_list = ['Alphabetical order', 'Reverse alphabetical', 'Cancel']
  sort_date_list = ['Newest', 'Oldest', 'Cancel']


  likes = {'1': 'Increasing', '2': 'Decreasing', '3': 'Cancel'}
  users = {'1': 'Alphabetical order', '2': 'Reverse alphabetical', '3': 'Cancel'}
  dates = {'1': 'Newest', '2': 'Oldest', '3': 'Cancel'}


  like_sort_tmp = 3;
  user_sort_tmp = 3;
  date_sort_tmp = 3;

  category_list = ['Bug / Warning/ Error', 'Suggestion / Ideas', 'Results validity', 'Clarification', 'Display', 'Other']
  category_list_formated = {
    'Bug / Warning/ Error': '_Fix',
    'Suggestion / Ideas': '_Feature',
    'Results validity': '_Validity',
    'Clarification': '_Clarification',
    'Display': '_Cosmetic',
    'Other': '_Other'
  }
  selected_like_sort = '';
  selected_user_sort = '';
  selected_date_sort = '';
  selectedCategory = []
  selectedTags = []
  selectedStatus = []

  /**
   * All feedback from database
   */
  feedack: any;

  /**
   * Current loged in user
   */
  CurrentUser: any;

  /**
   * List of news grouped by date
   */
  dateGroupBy = {};

  /**
   * All feedback from database
   */
  Liked: any;


  loading = true;


  close(abc: any){
    console.log(abc)
  }

}
