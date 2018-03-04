var express = require('express');
var router = express.Router();
var db = require('./db.js');

let newArray = [];

function toRoomModel(rows){
      console.log(rows)
      for (var i = 0; i < rows.length; i++){
            let bedsNumArray = rows[i].bedArray.split(',');
            let bedsAvailableArray = rows[i].availableArray.split(',');
            let room = {room_id: rows[i].room_id, name: rows[i].room_name, category: rows[i].category_name, description: rows[i].text, beds:[] };
            for (var z = 0; z < bedsNumArray.length; z++){
                  let obj = {bedNum: bedsNumArray[z], isAvailable: bedsAvailableArray[z]};
                  room.beds.push(obj);
            }
            newArray.push(room);
      } 
}

router.get('/', (req, res)=>{
      console.log('got request for all rooms');
      db.query('SELECT beds.room_id, rooms.room_name, roomsDescription.text, categories.category_name, group_concat(bed_number) as bedArray, group_concat(isAvailable) as availableArray from beds inner join rooms on beds.room_id=rooms.room_id inner join roomsDescription on rooms.description_id=roomsDescription.description_id inner join categories on rooms.category_id=categories.category_id group by room_id', function(err, rows, fields){
            if (!err) {
                  console.log(rows);
                  toRoomModel(rows);
                  console.log(newArray);
                  res.send(newArray);
                     }
            else console.log('error');
      })
      
 });

 module.exports = router;