export class BedsModel {
    bed_id: number;
    bed_number: number;
    room_id: number;
    isAvailable: number;
}


export class CategoryModel {
    category_id: number;
    category_name: string;
    room_type: string;
}

export class DescriptionModel {
    description_id: number;
    text: string;
}


export class RoomModel{
    room_id: number;
    room_name: string;
    category_id: number;
    description_id: number;
    beds:[
        {bedNum:string, isAvailable: string}
    ]
    
    constructor(obj) {
        for (let prop in obj) this[prop] = obj[prop];
    }
}