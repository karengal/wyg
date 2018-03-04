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
              private dialogRef: MatDialogRef<AddRoomDialogComponent>) { }

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
