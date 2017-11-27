var express    = require("express"),
    router     = express.Router(),
    mysql      = require("mysql"),
    connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "users",
      debug: false
    });
// check to ensure database is connected
connection.connect(function(err){
  if (!err) {
    console.log("Database is connected")
  } else {
    console.log("Error with database connection");
  }
});

// INDEX route
router.get("/", function(req, res){
  res.render("home");
});

// USER routes
// INDEX get route to view all users
router.get("/users", function(req, res, next){
  req.getConnection(function(err, conn){
    if (err) {
      return next("Error: " + err);
    }
    // define query that selects all users from database
    var query = conn.query("SELECT * FROM t_user", function(err, users){
      if (err) {
        console.log(err);
        return next("Error: " + err);
      }
      res.render("index", {data:users});
    })
  });
});

// GET route for new user
router.get("/users/new", function(req, res){
  res.render("new");
});

// POST route
router.post("/users/new", function(req, res){
  //validation - express-validator functions
  req.assert('name','Name is required').notEmpty();
  req.assert('email','Email address is required').isEmail();
  req.assert('password','Enter a password between 8 - 16 characters').len(8,16);

  var errs = req.validationErrors();
  if (errs) {
    res.status(422).json(errs);
    return;
  }
  var dateCreated = new Date();
  // get data from form
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created: dateCreated
  }
  // insert data to database
  req.getConnection(function(err, conn){
    if (err) {
      return next("Error: " + err)
    }
    // add data to t_user table
    var query = conn.query("INSERT INTO t_user set ? ", data, function(err, rows){
      if (err) {
        console.log("Error: " + err)
      }
      res.redirect("/users");
    });
  });

});

// LOGIN routes
router.get("/login", function(req, res){
  res.render("login");
});

router.post("/login", function(req, res){
  // login credentials
  var email = req.body.email;
  var password = req.body.password;
  // query to check t_user table to find email that matches user input
  connection.query("SELECT * FROM t_user WHERE email=?", [email], function(err, results, fields){
    if (err) {
      console.log("Error: " + err);
    } else {
      console.log(results);
      // if a result is returned check user input for password against password field in table
      if (results.length > 0) {
        if (results[0].password == password) {
          res.redirect("/users");
        } else {
          res.redirect("/login");
          console.log("Error: Email and Password do not match")
        }
      } else {
        res.redirect("/login");
        console.log("Error: Email does not exist");
      }
    }
  })
});

module.exports = router;
