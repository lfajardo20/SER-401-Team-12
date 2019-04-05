var mysql = require('mysql');

var pool  = mysql.createPool({
    host: "arrivaldatabase.cerlvveo6skh.us-east-2.rds.amazonaws.com",
    user: 'arrival',
    password: 'brbUh86hELkWf82',
    port: "3306",
    database: 'app',
    multipleStatements: true,
  });
  
exports.handler = async (event, context, callback) => {
  //prevent timeout from waiting event loop
  
  let {id} = event;

  var queryAccount = "SELECT confirmed FROM app.appointment WHERE accountNum=" + id + ";"; 

  
    context.callbackWaitsForEmptyEventLoop = false;
    return new Promise(function(resolve, reject)
    {
        try{
            pool.getConnection(function(err, connection) 
            {
                // Use the connection
                connection.query(queryAccount, function (error, result, fields)
                {
                    // And done with the connection.
                    connection.release();
                    //if Error reject promise
                    if (error || result == undefined)
                    {
                        reject("User does not exist!");   
                    }
                    else
                    {
                        resolve({Data: result});
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
