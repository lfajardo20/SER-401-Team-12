var mysql = require('mysql');

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

var connection = mysql.createConnection({
  host: "arrival.c5mhqvi6mxwz.us-west-1.rds.amazonaws.com",
  user: "master",
  password: "password"
});

//Checks for correct login name and password
function checkLogin(inputName, inputPassword)
{    
    var quaryStr = "SELECT * FROM app.user WHERE userName ='" + inputName + "'"; 

    //connect to Database
    connection.connect(function(err) 
    {
        if (err) throw err;
            connection.query(quaryStr, function (err, result, fields) 
            {
                //if username dosent exist in database throw error
                if (err)
                {
                    throw err;
                    //Output for debugging
                    console.log("Incorrect username")
                }
                
                //Check if passwords match
                if(inputPassword === result[0].userPassword)
                {
                    console.log("correct Login")
                }
                else
                {
                    console.log("Incorrect Password")
                }
        }   )
    });
}
