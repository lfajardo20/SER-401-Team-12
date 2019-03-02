var mysql = require('mysql');//establish sql connection pool

var pool  = mysql.createPool({
    host: "mechris6temp.ddns.net",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'user',
  });
  
exports.handler = async (event, context, callback) => {
    //parse event info
    let {userName, passwordHash, userType, salt, phoneNumber} = event;
  
  var queryStr = "Insert into user.users" + 
    "(userName, passwordHash, userType, salt, phoneNumber) " +
    "Values (" + userName + ", " + passwordHash + ", " + userType + ", " + salt
    + ", " + phoneNumber + ")";
  
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
                    if (error) {
                        reject("Account creation failed");   
                    }
                    else {
                        callback(true);
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