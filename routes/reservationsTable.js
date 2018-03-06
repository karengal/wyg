var express = require('express');
var router = express.Router();
var db = require('./db.js');

let newArray = [];

function toRoomModel(rows) {
      function compare(a, b) {
            if (a.bedNum < b.bedNum)
                  return -1;
            if (a.bedNum > b.bedNum)
                  return 1;
            return 0;
      }

      for (var i = 0; i < rows.length; i++) {
            let bedsNumArray = rows[i].bedArray.split(',');
            let bedsAvailableArray = rows[i].availableArray.split(',');
            let bedsIdArray = rows[i].bedIdArray.split(',');
            console.log(bedsNumArray);
            console.log(bedsAvailableArray);
            let room = {room_id: rows[i].room_id, name: rows[i].room_name, category: rows[i].category_name, description: rows[i].descText, beds:[] };
            for (var z = 0; z < bedsNumArray.length; z++){
                  let obj = {bed_id: bedsIdArray[z], bedNum: bedsNumArray[z], isAvailable: bedsAvailableArray[z]};

                  room.beds.push(obj);
            };
            room.beds.sort(compare);
            newArray.push(room);
      }
}

router.get('/', (req, res)=>{
      db.query('SELECT beds.room_id, rooms.room_name, roomsDescription.descText, categories.category_name, group_concat(bed_number) as bedArray, group_concat(isAvailable) as availableArray, group_concat(bed_id) as bedIdArray from beds inner join rooms on beds.room_id=rooms.room_id inner join roomsDescription on rooms.description_id=roomsDescription.description_id inner join categories on rooms.category_id=categories.category_id group by room_id', function(err, rows, fields){
            if (!err) {
                  console.log(rows.length);

                  toRoomModel(rows);
                  res.send(newArray);
            }
            else console.log('error - ' + err);
      })

});

router.post('/', (req, res) => {
      console.log(req.body);
})

 router.get('/categories', (req, res)=>{
       db.query('SELECT categories.category_id, categories.category_name from categories', function(err, rows, fields){
             if (!err) res.send(rows);
             else console.log(err);
       })
 })


router.post('/categories', (req, res) => {
      console.log(req.body);
      db.query('INSERT INTO categories SET ?', { category_name: req.body.category_name, room_type: req.body.room_type }, function (err, rows, fields) {
            if (!err) {
                  res.send(rows);
                  console.log(rows);
            }
            else console.log(err);
      })
})

router.post('/addroom', (req, res) => {
      console.log('this is req.body !!!! ' + JSON.stringify(req.body))
      db.query(`CALL add_room('${req.body.description}', '${req.body.name}', ${req.body.category},${req.body.beds})`, function (err, result) {
            if (!err) {
                  res.send(result);
            }
            else {
                  console.log(err)
                  res.send(err)
            };
      })
})

router.delete('/deleteroom/:roomId', (req, res) => {
      console.log(req.params.roomId)
      db.query(`CALL deleteRoom(${req.params.roomId})`, function (err, result) {
            if (!err) {
                  res.send(JSON.stringify(result));
            }
            else {
                  console.log(err)
                  res.send(err)
            }
      })
})
// router.put('/editroom/:roomId', (req, res) => {
//       console.log('this is req.body !!!! ' + JSON.stringify(req.body))
//       db.query(`CALL add_room('${req.body.description}', '${req.body.name}', ${req.body.category},${req.body.beds})`, function (err, result) {
//             if (!err) {
//                   res.send(result);
//             }
//             else {
//                   console.log(err)
//                   res.send(err)
//             };
//       })
// })



 router.get('/calendar', (req, res)=>{
       db.query('SELECT id, db_date, month, CAST(day as CHAR(10)) as dayNum, day_name, month_name FROM time_dimension WHERE db_date BETWEEN curdate() AND DATE_ADD(NOW(), INTERVAL 9 DAY)', function(err, rows, fields){
             if (!err) res.send(rows);
             else console.log(err);
       })
 })

 router.get('/calendar/:id',(req,res)=>{
       db.query('SELECT id, db_date, month, CAST(day as CHAR(10)) as dayNum, day_name, month_name FROM time_dimension WHERE db_date BETWEEN DATE_ADD("' + req.params.id+ '", INTERVAL 1 DAY) AND DATE_ADD("'+req.params.id+'", INTERVAL 11 DAY)', function(err, rows, fields){
            if(!err) res.send(rows);
            else console.log(err);
       })

      })

 router.get('/calendarback/:id',(req,res)=>{
      db.query('SELECT id, db_date, month, CAST(day as CHAR(10)) as dayNum, day_name, month_name FROM time_dimension WHERE db_date BETWEEN "' + req.params.id+ '"- INTERVAL 10 DAY AND "' + req.params.id+ '"', function(err, rows, fields){
           if(!err) res.send(rows);
           else console.log(err);
      })
})

 module.exports = router;

