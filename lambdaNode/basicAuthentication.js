var mysql = require('mysql');
var AWS = require('aws-sdk');

var pool  = mysql.createPool({
    host: "24.56.49.110",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'user',
  });
  
exports.handler = async (event, context, callback) => {
  //prevent timeout from waiting event loop
  
  var queryStr = "SELECT * FROM user.user WHERE userName ='" + event.userName + "'"; 
  
    context.callbackWaitsForEmptyEventLoop = false;
    return new Promise(function(resolve, reject)
    {
        pool.getConnection(function(err, connection) 
        {
            // Use the connection
            connection.query(queryStr, function (error, results, fields) 
            {
                // And done with the connection.
                connection.release();
                //if Error reject promise
                if (error)
                {
                    reject(error);   
                }
                else
                {
                    //Check if passwords match
                    if(event.password == results[0].userPassword)
                    {
                        resolve(true);
                    }
                    else
                    {
                        reject(false);
                    }
                }

                //Can end event now that call is finished    
                context.callbackWaitsForEmptyEventLoop = false;
            });
        });
    });
}