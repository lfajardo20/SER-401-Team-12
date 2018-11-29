/*
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-west-2'});

// Create publish parameters
var params = {
  Message: 'HELLO WORLD', 
  PhoneNumber: '+14803138592',
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
*/

/* exports.handler = (event, context, callback) => {

    let numbers = {};
    let id = event.id;

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
          if (error) callback(error);
          else callback(null, results);
          context.callbackWaitsForEmptyEventLoop = false;
        });
      });

      /* sms to all numbers
    try {
        // Handle promise's fulfilled/rejected states
        publishTextPromise.then(
            function(data) {
            console.log("MessageID is " + data.MessageId);
        }).catch(
            function(err) {
            console.error(err, err.stack);
        });
        callback(null, true);
}
catch (err) {
    callback(null, false);
}
*/
    
//};

//mysql connection pool
var mysql = require('mysql');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'app',
  });

  exports.handler = (event, context, callback) => {
      //prevent timeout from waiting event loop
  context.callbackWaitsForEmptyEventLoop = false;

  let id = event.id;
  let numbers = [{}];

pool.getConnection(function(err, connection) {
  // Use the connection
  connection.query(
        'SELECT DISTINCT phoneNumber ' + 
        'FROM app.staff as s, app.appointment as a ' + 
        'WHERE a.mainSurgeon = s.staffID AND a.accountNum = ' + id + ';',
     function (error, results, fields) {
    // And done with the connection.
    connection.release();
    // Handle error after the release.
    if (error) callback(error);
    else callback(null, results);
    context.callbackWaitsForEmptyEventLoop = false;
  });
});
  };