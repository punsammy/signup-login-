var express  = require("express"),
    router   = express.Router();

// INDEX route
router.get("/", function(req, res){
  res.render("home");
});

// USER routes
router.get("/users", function(req, res){
  req.getConnection(function(err, conn){
    if (err) {
      return next("Error: " + err);
    }
    var query = conn.query("SELECT * FROM t_user", function(err, users){
      if (err) {
        console.log(err);
        return next("Error: " + err);
      }
      res.render("index", {data:users});
    })
  });
});


module.exports = router;
