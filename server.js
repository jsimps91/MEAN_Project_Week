// add/remove required dependencies as needed
var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/dist')));

// IF SESSION
app.use(session({secret: 'codingdojorocks'})); 

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

app.listen(8000, function() {
    console.log('The World is Listening on port 8000');
});