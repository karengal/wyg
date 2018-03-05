var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'b0104e5aa74320',
    password : 'b6737162',
    database : 'heroku_30e0925129ce4c9'
 });

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
