import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DateModel} from '../app/models/date'

@Injectable()
export class CalenderService {
  rooms: Array<{name:string, category:string, desc: string, beds: any[]}>;
  numbersObjArray = new Array();
  numbersArray = new Array();
  displayedColumns: any[] = ['room'];
  constructor(private http: HttpClient) { }

  
   jumpTen(date): Observable<DateModel[]>{
     return this.http.get<DateModel[]>('api/reservationsTable/calendar/'+ date);
   }

   jumpTenBack(date): Observable<DateModel[]>{
    return this.http.get<DateModel[]>('api/reservationsTable/calendarback/'+ date);
   }

  daysColGenerator_fromDb(): Observable<DateModel[]>{
    return this.http.get<DateModel[]>('api/reservationsTable/calendar');
  }

}
