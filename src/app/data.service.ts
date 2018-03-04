import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';


const ROOMS = 
  [{name:'1', category:'some category', desc:'some description', beds: [{bed:1}, {bed:2}, {bed:3}, {bed:4}, {bed:5}, {bed:6}]},
  {name:'2', category:'some category', desc:'some description', beds: [{bed:1}, {bed:2}]},
  {name:'3', category:'some category', desc:'some description', beds: [{bed:1}, {bed:2}, {bed:3}, {bed:4}]}
]

@Injectable()
export class DataService {
rooms: Array<{name:string, category:string, desc: string, beds: any[]}>;
  constructor() { }

  getRooms(){
    this.rooms = ROOMS;
    return observableOf(this.rooms);
  }
}
