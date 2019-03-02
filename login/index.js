var mysql = require('mysql');
var crypto = require('crypto-js');

var pool  = mysql.createPool({
    host: "mechris6temp.ddns.net",
    user: 'db',
    password: 'password',
    port: "3306",
    database: 'user',
  });
  
exports.handler = async (event, context, callback) => {
  //prevent timeout from waiting event loop
  
  var queryStr = "SELECT userName, userType, salt, passwordHash FROM user.user WHERE userName ='" + event.userName + "'"; 

  
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
                        //hash password + salt
                        //see if this matches the account
                        let hash = Crypto.SHA256(event.password + "" + salt);
                        if(hash === results[0].passwordHash)
                        {
                            resolve(results[0].userType);
                        }
                        else
                        {
                            reject("Incorrect Password!");
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