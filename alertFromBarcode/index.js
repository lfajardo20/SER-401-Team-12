//mysql connection pool
var mysql = require('mysql');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'app',
  });

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-west-2'});

exports.handler = (event, context, callback) => {
    //prevent timeout from waiting event loop
    //context.callbackWaitsForEmptyEventLoop = false;

    let id = event.id;
    let location = "unknown location";
    if(event.lat && event.longi)
        location = lat + ", " + longi;
    let messages = [];

    pool.getConnection(function(connectionErr, connection) {
        if(connectionErr) callback(err);
        // Use the connection
        connection.query(
                'SELECT DISTINCT phoneNumber, date ' + 
                'FROM app.staff as s, app.appointment as a ' + 
                'WHERE a.mainSurgeon = s.staffID AND a.accountNum = ' + id + ';',
            function (error, results, fields) {
                // And done with the connection.
                connection.release();
                // Handle error after the release.
                if (error) callback(error);
                //load resulting numbers into array
                for(let ii = 0; ii < results.length; ii++) {
                    console.log(results[ii].date.toString());
                    let time = results[ii].date.toString().substring(16, 21);
                    messages[ii] = {
                        Message: "Your " + time + " appointment has been checked in from " + location,
                        PhoneNumber: results[ii].phoneNumber,
                    };
                }
            
                // Create promise and SNS service object
                var publishTextPromise = messageChain(messages);

                try {
                    // Handle promise's fulfilled/rejected states
                    publishTextPromise.then(
                        function(data) {
                        console.log("MessageID is " + data.MessageId);
                        callback(null, true);
                        return true;
                    }).catch(
                        function(err) {
                        console.error(err, err.stack);
                        callback(err);
                    });
                }
                catch (err) {
                    callback(null, false);
                }
                
               // messageChain(messages).then(() => callback(null, true));
        });
    });
    callback(null, true);
};


function messageChain(messages) {
    let chain = Promise.resolve();
    for(let ii = 0; ii < messages.length; ii++) {
        let message = messages[ii];
        chain = chain.then(() => new AWS.SNS({apiVersion: '2010-03-31'}).publish(message).promise());
    }
    return chain;
}