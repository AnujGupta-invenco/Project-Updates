import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
//This module has been added for ngif
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { StepperDataService } from '../stepper-data.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

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
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatAutocompleteModule
  ]
})



export class StepperComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  filteredOptions: Observable<string[]>;
  keyGroup: any[] = [];
  
  constructor(private formBuilder: FormBuilder, private stepperDataService : StepperDataService, private renderer : Renderer2) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  // RKI Request Name Step 
  isRKIRequestNameDone: boolean = false;
  RKIRequestName!: string;
  RKIRequestNameGroup: FormGroup = this.formBuilder.group({RKIRequestNameCtrl: ['', Validators.required]});
  @ViewChild('requestNameInput') requestNameInput!: ElementRef;


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.requestNameInput.nativeElement === document.activeElement) {
      event.preventDefault();
      this.onClickOfRKIRequestName();
      const continueButton = document.querySelector('.custom-btn');
      if (continueButton) {
        this.renderer.selectRootElement(continueButton).click();
      }
    }
  }

  isRKIRequestNameIsValid(){
    return this.RKIRequestNameGroup.valid;
  }

  onClickOfRKIRequestName(){
    this.isRKIRequestNameDone = true;
    this.RKIRequestName = this.RKIRequestNameGroup.get('RKIRequestNameCtrl')?.value;
  }
  
  errorRKIRequestName(){
    return this.RKIRequestNameGroup.invalid && (this.RKIRequestNameGroup.touched || this.RKIRequestNameGroup.dirty);
  }

  onStepHeaderClick() {
    if (this.isRKIRequestNameDone) {
      this.isRKIRequestNameDone = false;
    }
  }


  ngOnInit(): void {
    this.stepperDataService.getData().subscribe(
      (result : any) => {
        this.keyGroup = result;
        // console.log(result);
      },
      (error : any) => {
        console.error("Error: ", error);
      }
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  // }

}


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
