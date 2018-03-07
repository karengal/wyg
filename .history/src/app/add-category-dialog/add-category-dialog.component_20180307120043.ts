import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';
import { CategoryModel } from '../models/CategoryModel';

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
      category_name: new FormControl('', Validators.required),
      room_type: new FormControl('', Validators.required),
    })
  }

  submit(form){
    let cat = new CategoryModel(form.value);
    this.dialogRef.close(cat);
  }

}

