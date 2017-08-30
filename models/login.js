var mysql = require("mysql");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'yii2basic'
});
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});
exports.login = function (req,res) {

    console.log(req.body.username);
    console.log(req.body.password);
    var username = req.body.username;
    var password = req.body.password;

    connection.query('SELECT * FROM user WHERE username = ?', [username], function (error, results, fields) {
        if (error) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    // var token;
                    // require('crypto').randomBytes(50, function(err, buffer) {
                    //     token = buffer.toString('hex');
                    // });
                    // // results[0].authKey = token;console.log(results[0].authKey);
                    // console.log(fields[3]);
                    // fields[3] = token;
                    res.send({
                        "code": 200,
                        "success": "login sucessfull",
                        "User": results[0]
                    });
                }
                else {
                    res.send({
                        "code": 204,
                        "error": "username and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "error": "username does not exits"
                });
            }
        }
    });
}

// module.exports = login;