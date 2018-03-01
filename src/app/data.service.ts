import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs/observable/of';


const ROOMS = 
  [{name:'1', category:'some category', desc:'some description', beds: [1, 2, 3, 4, 5, 6]},
  {name:'2', category:'some category', desc:'some description', beds: [1, 2]},
  {name:'3', category:'some category', desc:'some description', beds: [1, 2, 3, 4]}
]

@Injectable()
export class DataService {
rooms: any;
  constructor() { }

  getRooms(){
    this.rooms = ROOMS;
    return observableOf(this.rooms);
  }
}
