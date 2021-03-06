import { Component, OnInit, Inject } from '@angular/core';
import {MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditRoomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.data.room.name,
      category: this.data.room.category,
      description: this.data.room.description,
      beds: this.data.room.description,
    })
  }

}
