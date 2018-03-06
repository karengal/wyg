import { Injectable, EventEmitter} from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RoomModel } from './models/RoomModel';
import { CategoryModel } from './models/CategoryModel';



@Injectable()
export class DataService {
rooms: Array<{name:string, category:string, desc: string, beds: any[]}>;
numbersObjArray = new Array();
numbersArray = new Array();
displayedColumns: any[] = ['room'];
addedCategory : EventEmitter<CategoryModel[]> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getRooms(): Observable<RoomModel[]>{
    return this.http.get<RoomModel[]>('api/reservationsTable');
  }

  addRoom(room): Observable<any>{
return this.http.post<any>('api/reservationsTable', room);
  };

  getCategories(): Observable<{category_id: number, category_name: string}[]>{
    return this.http.get<{category_id: number, category_name: string}[]>('api/reservationsTable/categories');
  };

  addCategory(category): Observable<any>{
    return this.http.post<any>('api/reservationsTable/categories', category);
  }

  getAddedCategoryEmmiter(){
    return this.addedCategory;
  }

  categoryWasAdded(){
    this.addedCategory.emit();
  }

/* 
getToday(){
  let today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;
var year = today.getFullYear();
return {day: day, month: month, year: year};
}
daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
 };

 jumpTen(date){
   console.log(date);
   this.numbersObjArray = [];
   this.displayedColumns = ["room"];
  let array = new Array(10)
  console.log(array);
  this.numbersArray = array.fill(0).map((e, i) => {return (i+date.num).toString()});
  console.log(this.numbersArray);
  for (let i = 0; i < this.numbersArray.length; i++){
    let n = new Date(date.year, date.month-1,this.numbersArray[i]).getDay();
    this.displayedColumns.push(this.numbersArray[i]);
    let obj;
    if (n == 0){
      obj = {num: this.numbersArray[i], day:'sunday', month:date.month, year: date.year}
    } else if (n == 1){
      obj = {num: this.numbersArray[i], day:'monday', month:date.month, year: date.year}
    } else if (n == 2){
      obj = {num: this.numbersArray[i], day:'tuesday', month:date.month, year: date.year}
    } else if (n == 3){
      obj = {num: this.numbersArray[i], day:'wednesday', month:date.month, year: date.year}
    }else if (n == 4){
      obj = {num: this.numbersArray[i], day:'thursday', month:date.month, year: date.year}
    }else if (n == 5){
      obj = {num: this.numbersArray[i], day:'friday', month:date.month, year: date.year}
    }else if (n == 6){
      obj = {num: this.numbersArray[i], day:'saturday', month:date.month, year: date.year}
    }
    this.numbersObjArray.push(obj);
  }
  return {numbersObjArray: this.numbersObjArray, numbersArray: this.numbersArray, displayedColumns: this.displayedColumns }
}

 
  daysColGenerator(){
     let today = this.getToday();
     let N = this.daysInMonth(today.month, today.year);
     let array = new Array(N)
     this.numbersArray = array.fill(0).map((e, i) => {return (i+1).toString()});
     this.numbersArray.splice(0, this.numbersArray.indexOf(today.day.toString()));
     this.numbersArray = this.numbersArray.slice(0,10);
     console.log(this.numbersArray);
     for (let i = 0; i < this.numbersArray.length; i++){
       let n = new Date(today.year, today.month-1,this.numbersArray[i]).getDay();
       this.displayedColumns.push(this.numbersArray[i]);
       let obj;
       if (n == 0){
         obj = {num: this.numbersArray[i], day:'sunday', month:today.month, year: today.year}
       } else if (n == 1){
         obj = {num: this.numbersArray[i], day:'monday', month:today.month, year: today.year}
       } else if (n == 2){
         obj = {num: this.numbersArray[i], day:'tuesday', month:today.month, year: today.year}
       } else if (n == 3){
         obj = {num: this.numbersArray[i], day:'wednesday', month:today.month, year: today.year}
       }else if (n == 4){
         obj = {num: this.numbersArray[i], day:'thursday', month:today.month, year: today.year}
       }else if (n == 5){
         obj = {num: this.numbersArray[i], day:'friday', month:today.month, year: today.year}
       }else if (n == 6){
         obj = {num: this.numbersArray[i], day:'saturday', month:today.month, year: today.year}
       }
       this.numbersObjArray.push(obj);
     }
     return {numbersObjArray: this.numbersObjArray, numbersArray: this.numbersArray, displayedColumns: this.displayedColumns }
  } */
}
