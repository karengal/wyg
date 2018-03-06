export class RoomModel{
    room_id: number;
    name: string;
    category: string;
    description: string;
    beds:[
        {bed_id: number, bedNum:string, isAvailable: string}
    ]
    
    constructor(obj) {
        for (let prop in obj) this[prop] = obj[prop];
    }
}