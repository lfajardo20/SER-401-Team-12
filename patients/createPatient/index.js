var mysql = require('mysql');//establish sql connection pool

var pool  = mysql.createPool({
    host: "arrivaldatabase.cerlvveo6skh.us-east-2.rds.amazonaws.com",
    user: 'arrival',
    password: 'brbUh86hELkWf82',
    port: "3306",
    database: 'app',
  });

exports.handler = async (event, context, callback) => {
    //parse event info
    let {firstname, lastname, age, sex} = event;

    //add quotes to string variables
    firstname = addQuotes(firstname);
    lastname = addQuotes(lastname);
    sex = addQuotes(sex);

  var queryStr = "Insert into app.patient" + 
    "(firstname, lastname, age, sex) " +
    "Values (" + firstname + ", " + lastname + ", " + age + ", " + sex + ")";
    console.log(queryStr);

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
                        reject("Patient creation failed" + JSON.stringify(error));   
                    }
                    else {
                        resolve(true);
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

function addQuotes(val) {
        return "'" + val + "'";
} 