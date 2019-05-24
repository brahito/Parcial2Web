var express = require('express');
var exphbs = require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tienda';

// Create a new MongoClient
const client = new MongoClient(url);

var db = null;

// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);

    db = client.db(dbName);

    //client.close();
});


var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({
    defaultLayout:false,
}));
app.set('view engine', 'handlebars');

app.get('/inicio', function (request, response) {
 
    response.render('inicio');
});

app.get('/sobre', function (request, response) {
 
    response.render('sobre');
});

app.get('/contacto', function (request, response) {
 
    response.render('contacto');
});

app.get('/admin', function(req, res) {
   
    res.render('admin');
});

app.listen(3000);