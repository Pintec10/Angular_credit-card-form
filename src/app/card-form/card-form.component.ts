import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {

  cardForm = new FormGroup({
    name: new FormControl('', [   //1st arg is the initial value
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30)
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern(/^\d{16}$/)
    ]),
    expiration: new DateFormControl('', [
      Validators.required,
      Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern(/^\d{3}$/)
    ]),
  });

  //defining controls to pass them down to <app-input> as FormControl type, otherwise would be AbstractControl
  name = this.cardForm.controls.name as FormControl;
  cardNumber = this.cardForm.controls.cardNumber as FormControl;
  expiration = this.cardForm.controls.expiration as FormControl;
  securityCode = this.cardForm.controls.securityCode as FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("submitted")
  }

  onResetClick() {
    this.cardForm.reset();
  }

}
