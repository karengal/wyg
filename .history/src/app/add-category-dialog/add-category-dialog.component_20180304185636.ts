import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<AddCategoryDialogComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      room_id: this.generateId(),
      name: '',
      category: '',
      description: '',
      beds: [{bedNum: '', isAvailable: true}],
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

