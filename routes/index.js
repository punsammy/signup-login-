var express    = require("express"),
    router     = express.Router(),
    connection = require("express-myconnection"),
    mysql      = require("mysql");

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
  // get data from form
  var data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  // insert data to database
  req.getConnection(function(err, conn){
    if (err) {
      return next("Error: " + err)
    }
    var query = conn.query("INSERT INTO t_user set ? ", data, function(err, rows){
      if (err) {
        return next("Error: " + err)
      }
      res.redirect("/users");
    });
  });

});

module.exports = router;
