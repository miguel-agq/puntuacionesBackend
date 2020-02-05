var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Puntuacion = require('./models/puntuacion')


var app = express();
// Preparo body parser para que transforme las peticiones de texto a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.get('/', (req, res) => {
    res.status(200).send('hola');
});

app.get('/puntuaciones/', (req, res) => {
    Puntuacion.find({}).exec((err, puntuaciones) => {
        if(err){
            res.status(500).send({accion: 'get all', mensaje:'error al obtener la puntuacion'})
        }else{
            res.status(200).send({accion:'get all', datos:puntuaciones})
        }
    })    
   
    // let datosJSON = {
    //     accion:'get all',
    //     datos: [
    //         {nombre: 'pepe', puntuacion: 33},
    //         {nombre: 'bea', puntuacion: 23},
    //         {nombre: 'felix', puntuacion: 29}
    //     ]
    // };

    // res.status(200).send(datosJSON);db 
});


app.get('/puntuacion/:id', (req, res) => {
    let puntuacionId = req.params.id;

    Puntuacion.findById(puntuacionId).exec( (err, puntuacion) => {
        if(err){
            res.status(500).send({accion: 'get one', mensaje:'error al obtener la puntuacion'})
        }else{
            res.status(200).send({accion:'get one', datos:puntuacion})
        }
    })    

});

app.post('/puntuacion', (req, res) => {
    var datos = req.body;

    var puntuacion = new Puntuacion();
    puntuacion.nombre = datos.nombre;
    puntuacion.puntuacion = datos.puntuacion;
    puntuacion.save((err, puntuacionGuardada) => {
        if(err){
            res.status(500).send({accion:'save', mensaje:'error al guardar la puntuacion'});
        }else{
            res.status(200).send({accion:'save', datos:puntuacionGuardada});
        }
    })
    //TODO: insertar en la base de datos
    // let datosJsonRespuesta = {
    //     accion: 'save',
    //     datos: datos
    // }
    // res.status(200).send(datosJsonRespuesta);
});

app.delete('/puntuacion/:id', (req, res) => {
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndDelete(puntuacionId, (err, puntuacionBorrada) => {
        if (err) {
            res.status(500).send({accion:'delete', mensaje:'error al borrar la puntuacion'});
        }else if (!puntuacionBorrada) {
            res.status(404).send({accion:'delete', mensaje:'error el id a borrar no existe'})
        }
        else {
            res.status(200).send({accion:'delete', datos:puntuacionBorrada});
        }
    });

    // let puntuacionId = req.params.id;
    // let datosJsonRespuesta = {
    //     accion: 'delete',
    //     datos: puntuacionId
    // }

    // res.status(200).send(datosJsonRespuesta);
});


app.put('/puntuacion/:id', (req, res) => {
    var datos = req.body;
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndUpdate(puntuacionId, datos, (err, puntuacionActualizada) => {
        if (err) {
            res.status(500).send({accion:'update', mensaje:'error al modificar la puntuacion'});
        }else if(!puntuacionActualizada){
            res.status(404).send({accion:'delete', mensaje:'error el id a actualizar no existe'})
        }else{
            res.status(200).send({accion:'update', datos:puntuacionActualizada});
        }
    })
})


mongoose.connect('mongodb://localhost:27018/scores', (err, res) => {
    if(err){
        console.log('error al conectarme a la base de datos');
        throw err
    }else{
        console.log('conexion correcta a mongoDB')
        
        app.listen(5200, () => {
            console.log('API REST Funcionando en http://localhost:5200')

        })
    }
})
