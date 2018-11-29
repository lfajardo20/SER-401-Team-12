var mysql = require('mysql');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'app',
  });

  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query(
        'SELECT DISTINCT phoneNumber ' + 
        'FROM staff as s, appointment as a ' + 
        'WHERE a.mainSurgeon = s.staffID AND a.accountNum = 991579;',
    
    function (error, results, fields) {
      // And done with the connection.
      connection.release();
      // Handle error after the release.
      if (error) console.log(error);
      else console.log(results);
    });
  });