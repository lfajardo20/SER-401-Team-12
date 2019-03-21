var mysql = require('mysql');//establish sql connection pool

var pool  = mysql.createPool({
    host: "arrivaldatabase.cerlvveo6skh.us-east-2.rds.amazonaws.com",
    user: 'arrival',
    password: 'brbUh86hELkWf82',
    port: "3306"
  });


// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'us-west-2'});
  
exports.handler = async (event, context, callback) => {
    //parse event info
    let id = event.id;
    let location = "unknown location";
    let messages = [];
    
    if(event.location != null)
    {
        location = event.location;
    }
    
  //get users, appointments, and their associations
   var queryStr = 'SELECT DISTINCT phoneNumber,staffID FROM app.staff as s' +
   ', app.appointment as a WHERE s.staffID = a.mainSurgeon AND a.accountNum = ' + id + ';';

    context.callbackWaitsForEmptyEventLoop = false;
    return new Promise(function(resolve, reject)
    {
        try{
            pool.getConnection(function(err, connection) 
            {
                // Use the connection
                connection.query(queryStr, function (error, results, fields) 
                {
                    // And done with the connection.
                    connection.release();
                    //if Error reject promise
                    if (error || results[0] == undefined) {
                        reject("No appointment or staff info found");   
                    }
                    else {
                        //load messages and targets into array
                        for(let ii = 0; ii < results.length; ii++) {
                            //console.log(results[ii].date.toString());
                            //let time = results[ii].date.toString().substring(16, 21);
                            messages[ii] = {
                                Message: "Your appointment has been checked in from " + location,
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
                    }
    
                    //Can end event now that call is finished    
                    context.callbackWaitsForEmptyEventLoop = false;
                });
            });
        }
        catch(e)
        {
            //If server is down return null
            reject("Database is down.");
        }
    });
}

function messageChain(messages) {
    let chain = Promise.resolve();
    for(let ii = 0; ii < messages.length; ii++) 
    {
        let message = messages[ii];
        chain = chain.then(() => new AWS.SNS({apiVersion: '2010-03-31'}).publish(message).promise());
    }
    return chain;
}