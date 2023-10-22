import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
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
  keyGroup: any[] = [];
  
  constructor(private formBuilder: FormBuilder, private stepperDataService : StepperDataService, private renderer : Renderer2) {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filteredOptions) => {
        this.filteredOptions = filteredOptions;
      });
  }

  ngOnInit(): void {
    // fetching keyGroup data 
    this.stepperDataService.geRKIKeyGrouptData().subscribe(
      (result : any) => {
        this.keyGroup = result;
        // console.log(result);
      },
      (error : any) => {
        console.error("Error: ", error);
      }
    );

    // fetching aprovers date 
    this.stepperDataService.getApproversData().subscribe(
      (approvers : any) => {
        this.Approvers = approvers;
        console.log(this.Approvers);
      },
      (error : any) => {
        console.error("Error", error);
      }
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




  // Approver Step
  @Input() option: any;
  @Output() remove = new EventEmitter();
  filteredOptions: any[] = [];
  isAutocompleteVisible: boolean = false;
  Approvers: any[] = [];
  selectedPerson: any[] = [];

  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredOptions = this._filter(inputValue);
    this.isAutocompleteVisible = this.filteredOptions.length > 0 && inputValue.length>0;
    console.log(this.selectedPerson);
  }

  _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.Approvers.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  selectOption(option: string) {
    this.searchControl.setValue('');
    this.selectedPerson.push(option);
    this.isAutocompleteVisible = false;
  }

  removePerson(){
    this.remove.emit();
  }

  removeSelectedPerson(option: any){
    console.log(option);
    this.selectedPerson = this.selectedPerson.filter((person)=> person !== option);
  }
}