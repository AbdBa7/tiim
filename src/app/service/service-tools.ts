import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { AbstractControl, FormGroup, FormArray, FormControl } from'@angular/forms';
import { environment } from 'src/environments/environement';
import $ from 'jquery';
import { Router } from '@angular/router';
import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';

/**
 * Tools services
 */
@Injectable()
export class ToolsService {
  /**
   * Constructor
   */
  constructor(private router?: Router, ) { }

  /**
   * Get all keys from one array
   * @param map
   */
  static getKeys(map: {}) {
    return map ? Array.from(Object.keys(map)) : [];
  }

  /**
   * Add character to a number and return in string format
   * @param num Value to convert
   * @param size Size of the string result
   * @param chr Character ti add
   */
  static leftPad(num: number, size: number, chr: '0'): String {
    let s = num + ""
    while (s.length < size) s = chr + s;
    return s;
  }

  /**
   * Deepl clones the given AbstractControl, preserving values, validators, async validators, and disabled status.
   * @param control AbstractControl
   * @return AbstractControl
   */
  static cloneAbstractControl(control: AbstractControl) {
    let newControl: AbstractControl;

    if(control instanceof FormGroup) {
      const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
      const controls = control.controls

      Object.keys(controls).forEach(key => {
        formGroup.addControl(key, this.cloneAbstractControl(control[key]));
      })

      newControl = formGroup;
    }
    else if (control instanceof FormArray) {
      const formArray = new FormArray([], control.validator, control.asyncValidator);

      control.controls.forEach(formControl => formArray.push(this.cloneAbstractControl(formControl)))

      newControl = formArray;
    }
    else if (control instanceof FormControl) {
      newControl = new FormControl(control.value, control.validator, control.asyncValidator);
    }
    else {
      throw 'Error: unexpected control value';
    }

    if (control.disabled) newControl.disabled({ emiEvent: false });

    return newControl;
  }
}
