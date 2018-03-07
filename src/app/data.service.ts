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

  //filter version of get
  searchRoom(input){
    console.log(input);
    const params = {name: input};
    return this.http.get<RoomModel[]>('api/reservationsTable', {params});
  }

  addRoom(room): Observable<any>{
return this.http.post<any>('api/reservationsTable/addroom', room);
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
  editRoom(room):Observable<any>{
    return this.http.put<any>(`api/reservationsTable/editroom/${room.room_id}`, room)
  }
  deleteRoom(room):Observable<any>{
    return this.http.delete<any>(`api/reservationsTable/deleteroom/${room}`)
  }
}
