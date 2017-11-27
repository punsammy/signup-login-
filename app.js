var expressValidator = require("express-validator"),
    bodyParser       = require("body-parser"),
    express          = require("express"),
    session          = require("express-session"),
    app              = express();

// Define routes
var indexRoutes = require("./routes/index");

// Set EJS template Engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
// Session configuration
app.use(require("express-session")({
  secret: "Some secret",
  resave: false,
  saveUninitialized: false
}));

// MySQL Connection
var connection = require("express-myconnection"),
    mysql      = require("mysql");
app.use(connection(mysql, {
  host: "ca-cdbr-azure-east-a.cloudapp.net",
  user: "b0e3368f25fb40",
  password: "01f9318b",
  database: "remitbee",
  debug: false
}, "request"));


// Configure Routes
app.use(indexRoutes);

app.listen(process.env.PORT, function(){
  console.log("Server is listening on port 80");
});
