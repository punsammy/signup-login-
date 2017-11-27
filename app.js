var expressValidator = require("express-validator"),
    bodyParser       = require("body-parser"),
    express          = require("express"),
    app              = express();

// Define routes
var indexRoutes = require("./routes/index");

// Set EJS template Engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

// MySQL Connection
var connection = require("express-myconnection"),
    mysql      = require("mysql");
app.use(connection(mysql, {
  host: "localhost",
  user: "root",
  password: "password",
  database: "users",
  debug: false
}, "request"));

// Configure Routes
app.use(indexRoutes);

app.listen(process.env.PORT || 8080, function(){
  console.log("Server is listening on port 8080");
});
