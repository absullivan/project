// server.js

// set up ========================
var express = require('express');
var app = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var busboy = require('connect-busboy');
// configuration =================
app.use(express.static(__dirname + '/../node_modules'));  
app.use(express.static(__dirname + '/../public'));                 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(busboy());


var WebTorrent = require('webtorrent');
var client = new WebTorrent();
require('./routes')(app, client);

// listen (start app with node server.js) ======================================
app.listen(8080, function() {
    const ipc = require('electron').ipcRenderer;
    console.log("App listening on port 8080");
    ipc.send('server-run', 'ping')
});
