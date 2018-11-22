var mysql = require('mysql');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'user',
  });

pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query('SELECT * FROM user.user', function (error, results, fields) {
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (error) throw error;
    else console.log(results[0].userName);
    process.exit();
  });
});