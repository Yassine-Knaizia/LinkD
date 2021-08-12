var mysql = require('mysql');

// MySQL connection database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yass94683607',
    database: 'linkD',
});


module.exports = {
    connection
};