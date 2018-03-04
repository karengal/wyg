import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RoomModel } from './models/RoomModel';


@Injectable()
export class DataService {
rooms: Array<{name:string, category:string, desc: string, beds: any[]}>;
numbersObjArray = new Array();
numbersArray = new Array();
displayedColumns: any[] = ['room'];
  constructor(private http: HttpClient) { }

  getRooms(): Observable<RoomModel[]>{
/*     this.rooms = ROOMS;
    return observableOf(this.rooms); */
    return this.http.get<RoomModel[]>('api/reservationsTable');
  }

getToday(){
  let today = new Date();
var day = today.getDate();
var month = today.getMonth()+1;
var year = today.getFullYear();
return {day: day, month: month, year: year};
}

  daysColGenerator(){
    function daysInMonth (month, year) {
      return new Date(year, month, 0).getDate();
     };
     let today = this.getToday();
     let N = daysInMonth(today.month, today.year);
     let array = new Array(N)
     this.numbersArray = array.fill(0).map((e, i) => {return (i+1).toString()});
     this.numbersArray.splice(0, this.numbersArray.indexOf(today.day.toString()));
     for (let i = 0; i < this.numbersArray.length; i++){
       let n = new Date(today.year, today.month-1,this.numbersArray[i]).getDay();
       console.log(n);
       this.displayedColumns.push(this.numbersArray[i]);
       console.log(this.displayedColumns);
       let obj;
       if (n == 0){
         obj = {num: this.numbersArray[i], day:'sunday'}
       } else if (n == 1){
         obj = {num: this.numbersArray[i], day:'monday'}
       } else if (n == 2){
         obj = {num: this.numbersArray[i], day:'tuesday'}
       } else if (n == 3){
         obj = {num: this.numbersArray[i], day:'wednesday'}
       }else if (n == 4){
         obj = {num: this.numbersArray[i], day:'thursday'}
       }else if (n == 5){
         obj = {num: this.numbersArray[i], day:'friday'}
       }else if (n == 6){
         obj = {num: this.numbersArray[i], day:'saterday'}
       }
       this.numbersObjArray.push(obj);
     }
     return {numbersObjArray: this.numbersObjArray, numbersArray: this.numbersArray, displayedColumns: this.displayedColumns }
  }
}
