import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
//This module has been added for ngif
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ]
})
export class StepperComponent {
  // isCreateRequest: boolean = false;
  // isRequestName: boolean = false;
  // isRequestKey: boolean = false;
  // isDevices: boolean = false;
  // isApproachers: boolean = false;
  // requestedName: string = '';

  // constructor(private _formBuilder: FormBuilder) {}

  // requestNameGroup: FormGroup = this._formBuilder.group({requestNameCtrl: ['']});
  // keyGroup: FormGroup = this._formBuilder.group({keyGroupCtrl: ['']});
  // devicesGroup: FormGroup = this._formBuilder.group({devicesCtrl: ['']});
  // approversGroup: FormGroup = this._formBuilder.group({approversCtrl: ['']});

  // onDone(){
  //   this.isCreateRequest = true;
  // }

  // isRequestNameValid(){
  //   return this.requestNameGroup.valid;
  // }
  
  // onCreateRequestName(){
  //   this.isRequestName = true;
  //   this.requestedName = this.requestNameGroup.get('requestNameCtrl')?.value;
  // }

  // showErrorMessageRequestName(){
  //   return this.requestNameGroup.invalid && (this.requestNameGroup.touched || this.requestNameGroup.dirty);
  // }

  // isKeyValid(){
  //   return this.keyGroup.valid && this.keyGroup.touched;
  // }

  // isDeviceValid(){
  //   return this.devicesGroup.valid && this.devicesGroup.touched;
  // }

  // isApproverValid(){
  //   return this.approversGroup.valid && this.approversGroup.touched;
  // }


  // onCreateRequestKey(){

  // }

  // onCreateDevice(){

  // }

  // onCreateApproverh(){

  // }

  currentStep = 0;

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
