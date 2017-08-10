var mysql = require("mysql");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
             res.json({"Error" : false, "Message" : "Hello !"});
    });

    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["user","username","password",req.body.username,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.get("/users",function(req,res){
       var query = "SELECT * FROM ??";
       var table = ["user"];
       query = mysql.format(query,table);
       connection.query(query,function(err,rows){
           if(err) {
               res.json({"Error" : true, "Message" : "Error executing MySQL query"});
           } else {
               res.json({"Error" : false, "Message" : "Success", "Users" : rows});
           }
       });
   });

    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user","id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"+query});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post("/register",function(req,res){
      // console.log("req",req.body);
      var today = new Date();
      var users={
        "username":req.body.username,
        "password":req.body.password,
      }
      connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
      if (error) {
        console.log("error ocurred",error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        console.log('The solution is: ', results);
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
      }
      });
    });
    // router.post('/register',login.register);
    // router.post('/login',login.login)
    router.post("/login",function(req,res){
        // console.log(req.body.username);
        // console.log(req.body.password);
      var username = req.body.username;
      var password = req.body.password;

      connection.query('SELECT * FROM user WHERE username = ?',[username], function (error, results, fields) {
      if (error) {
        // console.log("error ocurred",error);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        // console.log('The solution is: ', results);
        if(results.length >0){
          if(results[0].password == password){
              // var token;
              // require('crypto').randomBytes(50, function(err, buffer) {
              //     token = buffer.toString('hex');
              // });
              // // results[0].authKey = token;console.log(results[0].authKey);
              // console.log(fields[3]);
              // fields[3] = token;
            res.send({
              "code":200,
              "success":"login sucessfull",
              "User" : results[0]
            });
          }
          else{
            res.send({
              "code":204,
              "error":"username and password does not match"
            });
          }
        }
        else{
          res.send({
            "code":204,
            "error":"username does not exits"
          });
        }
      }
      });
    });
}

module.exports = REST_ROUTER;
