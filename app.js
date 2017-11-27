var expressValidator = require("express-validator"),
    bodyParser       = require("body-parser"),
    express          = require("express"),
    app              = express();

// Set EJS template Engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

// Configure Routes
var indexRoutes = require("./routes/index");
app.use(indexRoutes);

// MySQL Connection
var connection = require("express-myconnection"),
    mysql      = require("mysql");
app.use(connection(mysql, {
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
  debug: false
}, "request"));

app.listen(process.env.PORT || 8080, function(){
  console.log("Server is listening on port 8080");
});
