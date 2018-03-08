var express = require('express');
var router = express.Router();
var db = require('./db.js');
const toRoomModel = require('../global_functions.js');

router.get('/', (req, res) => {
      if (req.query.name === undefined) {
            db.getConnection(function (err, connection) {
                  connection.query('SELECT beds.room_id, rooms.room_name, roomsdescription.descText, categories.category_name, group_concat(bed_number) as bedArray,group_concat(bed_id) as bedIdArray, group_concat(isAvailable) as availableArray from beds inner join rooms on beds.room_id=rooms.room_id inner join roomsdescription on rooms.description_id=roomsdescription.description_id inner join categories on rooms.category_id=categories.category_id group by room_id', function (err, rows, fields) {
                        connection.release();
                        if (!err) {
                              res.send(toRoomModel(rows));
                        }
                        else throw err;
                  })
            })
      } else {
            db.getConnection(function (err, connection) {
                  connection.query('SELECT beds.room_id, rooms.room_name, roomsdescription.descText, categories.category_name, group_concat(bed_number) as bedArray,group_concat(bed_id) as bedIdArray, group_concat(isAvailable) as availableArray from beds inner join rooms on beds.room_id=rooms.room_id inner join roomsdescription on rooms.description_id=roomsdescription.description_id inner join categories on rooms.category_id=categories.category_id where rooms.room_name like "%' + req.query.name + '%"' + 'group by room_id', function (err, rows, fields) {
                        connection.release();
                        if (!err) {
                              res.send(toRoomModel(rows));
                        } else throw err;
                  })
            })

      }
});


router.post('/', (req, res) => {
      console.log(req.body);
})

router.get('/categories', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query('SELECT categories.category_id, categories.category_name from categories', function (err, rows, fields) {
                  connection.release();
                  if (!err) res.send(rows);
                  else throw err;
            })
      })
})


router.post('/categories', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query('INSERT INTO categories SET ?', { category_name: req.body.category_name, room_type: req.body.room_type }, function (err, rows, fields) {
                  connection.release();
                  if (!err) {
                        res.send(rows);
                  }
                  else throw err;
            })
      })
})

router.post('/addroom', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query(`CALL add_room('${req.body.description}', '${req.body.name}', ${req.body.category},${req.body.beds})`, function (err, result) {
                  connection.release();
                  if (!err) {
                        res.send(result);
                  }
                  else {
                        res.send(err)
                  };
            })
      })
})

router.delete('/deleteroom/:roomId', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query(`CALL deleteRoom(${req.params.roomId})`, function (err, result) {
                  connection.release()
                  if (!err) {
                        res.send(JSON.stringify(result));
                  }
                  else {
                        res.send(err)
                  }
            })
      })
})
router.put('/editroom/:roomId', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query(`CALL update_room(${req.params.roomId},'${req.body.description}', '${req.body.name}', ${req.body.category},${req.body.beds})`, function (err, result) {
                  connection.release();
                  if (!err) {
                        res.send(result);
                  }
                  else {
                        res.send(err)
                  };
            })
      })
})



router.get('/calendar', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query('SELECT id, db_date, month, CAST(day as CHAR(10)) as dayNum, day_name, month_name FROM time_dimension WHERE db_date BETWEEN curdate() AND DATE_ADD(NOW(), INTERVAL 9 DAY)', function (err, rows, fields) {
                  connection.release();
                  if (!err) res.send(rows);
                  else throw err;
            })
      })
})

router.get('/calendar/:id', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query('SELECT id, db_date, month, CAST(day as CHAR(10)) as dayNum, day_name, month_name FROM time_dimension WHERE db_date BETWEEN DATE_ADD("' + req.params.id + '", INTERVAL 1 DAY) AND DATE_ADD("' + req.params.id + '", INTERVAL 11 DAY)', function (err, rows, fields) {
                  connection.release();
                  if (!err) res.send(rows);
                  else throw err;
            })
      })

})

router.get('/calendarback/:id', (req, res) => {
      db.getConnection(function (err, connection) {
            connection.query('SELECT id, db_date, month, CAST(day as CHAR(10)) as dayNum, day_name, month_name FROM time_dimension WHERE db_date BETWEEN "' + req.params.id + '"- INTERVAL 10 DAY AND "' + req.params.id + '"', function (err, rows, fields) {
                  connection.release();
                  if (!err) res.send(rows);
                  else throw err;
            })
      })
})

module.exports = router;

