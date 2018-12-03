import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';
import { CategoryModel } from '../models/CategoryModel';

// export interface CustomEmitObj {
//     id: number;
//     element:Object;
//     mode:boolean;
// }

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})

export class ConfirmDeleteDialogComponent implements OnInit{
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      
    })
    // delete(){
    //   this.editDelete.emit({id: this.id, element: this.element, mode: false});
    // }
  }

  // submit(form){
  //   let cat = new CategoryModel(form.value);
  //   this.dialogRef.close(cat);
  // }


}




