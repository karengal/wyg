import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';

@Component({
  selector: 'app-add-room-dialog',
  templateUrl: './add-room-dialog.component.html',
  styleUrls: ['./add-room-dialog.component.css']
})
export class AddRoomDialogComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddCustomerComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.generateId(),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company_id: ''
    })
  }
  private generateId() {
    let n = Math.random() * 10000000;
    return Math.floor(Math.random() * n);
  };

  submit(form){
    let room = new RoomModel(form.value);
    console.log(room);
    this.dialogRef.close(room);
  }

}

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddCustomerComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: this.generateId(),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company_id: ''
    })
  }
  private generateId() {
    let n = Math.random() * 10000000;
    return Math.floor(Math.random() * n);
  };

  submit(form){
    let customer = new Customer(form.value);
    console.log(customer);
    this.dialogRef.close(customer);
  }

}