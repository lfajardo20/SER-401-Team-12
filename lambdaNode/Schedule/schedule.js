var mysql = require('mysql');
var AWS = require('aws-sdk');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306"
  });
  
exports.handler = async (event, context, callback) => {
  //prevent timeout from waiting event loop
  
  var queryStr = "SELECT * FROM app.appointment WHERE mainSurgon ='" + event.staffID + "'"; 
  
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
                    if (error || results[0] == undefined)
                    {
                        reject("User does not exist!");   
                    }
                    else
                    {
                        resolve(JSON.stringify(results));
                    }                    
    
                    //Can end event now that call is finished    
                    context.callbackWaitsForEmptyEventLoop = false;
                });
            });
        }
        catch(e)
        {
            //If server is down return null
            reject(null);
        }
    });
}
