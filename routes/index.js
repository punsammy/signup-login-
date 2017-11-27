var express  = require("express"),
    router   = express.Router();

// INDEX route
router.get("/", function(req, res){
  res.render("home");
});

// USER routes
// INDEX get route to view all users
router.get("/users", function(req, res){
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
router.post("/users", function(req, res){
  //validation - express-validator functions
  req.assert('name','Name is required').notEmpty();
  req.assert('email','Email address is required').isEmail();
  req.assert('password','Enter a password between 8 - 16 characters').len(8,16);

  var errs = req.validationErrors();
  if (errs) {
    res.status(422).json(errs);
    return;
  }

});

module.exports = router;
