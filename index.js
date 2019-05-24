var express = require('express');
var exphbs = require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'visitas';
const client = new MongoClient(url);
var db = null;

client.connect(function (err) {
    assert.equal(null, err);

    db = client.db(dbName);
});

var app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({
    defaultLayout:false,
}));
app.set('view engine', 'handlebars');

app.get('/inicio', function (request, response) {
    var visita = {
        nombre:'Inicio',
        fecha: new Date(),

    };

    var collection = db.collection('visitas');
    collection.insertOne(visita, function(err){
        assert.equal(err, null);

        console.log('pedido guardado');
    });
    response.render('inicio');
});

app.get('/sobre', function (request, response) {
    var visita = {
        nombre:'Sobre',
        fecha: new Date(),

    };

    var collection = db.collection('visitas');
    collection.insertOne(visita, function(err){
        assert.equal(err, null);

        console.log('pedido guardado');
    });
    response.render('sobre');
});

app.get('/contacto', function (request, response) {
    var visita = {
        nombre:'Contacto',
        fecha: new Date(),

    };

    var collection = db.collection('visitas');
    collection.insertOne(visita, function(err){
        assert.equal(err, null);

        console.log('pedido guardado');
    });    response.render('contacto');
});

app.get('/admin', function(request, response) {
    client.connect(function (err) {
        assert.equal(null, err);
        const db = client.db(dbName);
        const visitas = db.collection('visitas');
        visitas.find({}).sort({_id:-1}).toArray(function (err, docs) {
            assert.equal(err, null);
            let visitasIni = 0;
            let  visitasSobre = 0;
            let visitasConta = 0;
            docs.forEach(visita => {
                if (visita.nombre == 'Inicio') {
                    visitasIni += 1;
                } else if (visita.nombre == 'Sobre') {
                    visitasSobre += 1;
                } else if (visita.nombre == 'Contacto') {
                    visitasConta += 1;
                } 
            });
            contexto = {
                visitaIni: visitasIni,
                visitaSobre: visitasSobre,
                visitaConta: visitasConta,
                visitas: docs
            };
            response.render('admin', contexto);
        });
    });
});

app.listen(3000);
