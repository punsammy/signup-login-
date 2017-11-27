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
