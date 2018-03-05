var express = require('express');
var router = express.Router();
var db = require('./db.js');

let newArray = [];

function toRoomModel(rows){
      function compare(a,b) {
            if (a.bedNum < b.bedNum)
              return -1;
            if (a.bedNum > b.bedNum)
              return 1;
            return 0;
          }

      console.log(rows)
      for (var i = 0; i < rows.length; i++){
            let bedsNumArray = rows[i].bedArray.split(',');
            let bedsAvailableArray = rows[i].availableArray.split(',');
            console.log(bedsNumArray);
            console.log(bedsAvailableArray);
            let room = {room_id: rows[i].room_id, name: rows[i].room_name, category: rows[i].category_name, description: rows[i].text, beds:[] };
            for (var z = 0; z < bedsNumArray.length; z++){
                  let obj = {bedNum: bedsNumArray[z], isAvailable: bedsAvailableArray[z]};
                  room.beds.push(obj);
            };
            room.beds.sort(compare);
            newArray.push(room);
      } 
}

router.get('/', (req, res)=>{
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

 router.post('/', (req, res)=>{
console.log(req.body);
 })

 router.get('/categories', (req, res)=>{
       db.query('SELECT categories.category_id, categories.category_name from categories', function(err, rows, fields){
             if (!err) res.send(rows);
             else console.log('error');
       })
 })

 router.post('/categories', (req, res)=>{
      console.log(req.body);
      db.query('INSERT INTO categories SET ?',{category_name: req.body.category_name, room_type: req.body.room_type}, function(err, rows, fields){
            if (!err) {
                  res.send(rows);
                  console.log(rows);
            }
            else console.log(err);
      } )
 })

 module.exports = router;