var mysql = require('mysql');

var db_config = {
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'b0104e5aa74320',
    password : 'b6737162',
    database : 'heroku_30e0925129ce4c9'

}

var connection;

function handleDisconnect(){
    connection = mysql.createConnection(db_config);

    connection.connect(function(err){
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err){
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = connection;