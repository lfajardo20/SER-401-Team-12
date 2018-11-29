var mysql = require('mysql');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'user',
  });

  exports.handler = (event, context, callback) => {
      //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;

pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query('SELECT * FROM user.user', function (error, results, fields) {
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (error) callback(error);
    else callback(null, results[0].userName);
    context.callbackWaitsForEmptyEventLoop = false;
  });
});
  };