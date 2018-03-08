var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'sql11.freemysqlhosting.net',
    user     : 'sql11225120',
    password : 'gRRd3hgNjM',
    database : 'sql11225120'
  });
  


module.exports = pool;