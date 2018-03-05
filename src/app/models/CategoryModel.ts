export class CategoryModel {
    category_id: number;
    category_name: string;
    room_type: string;

    constructor(obj) {
        for (let prop in obj) this[prop] = obj[prop];
    }
};