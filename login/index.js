var mysql = require('mysql');
var crypto = require('crypto-js');

var pool  = mysql.createPool({
    host: "arrivaldatabase.cerlvveo6skh.us-east-2.rds.amazonaws.com",
    user: 'arrival',
    password: 'brbUh86hELkWf82',
    port: "3306",
    database: 'app',
  });
  
exports.handler = async (event, context, callback) => {
  //prevent timeout from waiting event loop
  let userName = mysql.escape(event.userName);
  var queryStr = "SELECT userName, userType, salt, passwordHash\n" +
  "FROM app.account\n" +
  "WHERE userName =" + userName; 

  
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
                        console.log(results)
                        //hash password + salt
                        //see if this matches the account
                        let hash = String(crypto.SHA256(event.password + "" + results[0].salt));
                        console.log(results[0].salt);
                        console.log(event.password);
                        
                        console.log("Hashed password: " +hash);
                        console.log("Server hash:" + results[0].passwordHash);
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