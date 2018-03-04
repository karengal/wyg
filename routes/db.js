var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'A135246t',
    database : 'wyg'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
