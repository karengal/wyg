import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RoomModel } from '../models/RoomModel';
import { DataService } from '../data.service';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent {
  form: FormGroup;
  categories: { category_id: number, category_name: string }[];
  openDialogRefCat: MatDialogRef<AddCategoryDialogComponent>;
  constructor(private dataService: DataService, public dialog: MatDialog, private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getCatagories();
    this.dataService.getAddedCategoryEmmiter().subscribe(
      () => { this.getCatagories() })
    this.form = this.formBuilder.group({
      room_id: this.data.room.room_id,
      name: new FormControl(this.data.room.name,[Validators.required]),
      category: new FormControl('',[Validators.required]),
      description: this.data.room.description,
      beds: new FormControl(this.data.room.beds.length,[Validators.required]),
    })
  }

  getCatagories() {
    this.dataService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    ), error => console.log('error');
  }

  submit(form) {
    let room = new RoomModel(form.value);
    this.dialogRef.close(room);
  }

  openDialogCategories(){
    this.openDialogRefCat = this.dialog.open(AddCategoryDialogComponent);
    this.openDialogRefCat
    .afterClosed()
    .subscribe(
      result=> {
        console.log(result);
        this.dataService.addCategory(result).subscribe(
          data=>{
            this.dataService.categoryWasAdded();
          }
        ), error=>console.log('error');
      }
    ), error=> console.log('error')
  };
}
