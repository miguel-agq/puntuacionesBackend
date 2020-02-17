var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routerUsuario = require('./routers/usuario');
var routerPuntuacion = require('./routers/puntuacion');
var cors = require('cors');
var morgan = require('morgan');
var dotenv = require('dotenv');

var app = express();
dotenv.config();
// Preparo body parser para que transforme las peticiones de texto a json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

app.use('/puntuacion', routerPuntuacion)
app.use('/usuario', routerUsuario)

/*
existe un modulo npm install cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
*/


app.get('/', (req, res) => {
    res.status(200).send('hola');
});

/*
mongoose.connect('mongodb://localhost:27018/scores',{useFindAndModify:true, useNewUrlParser: true, useUnifiedTopology: true} , (err, res) => {
    if (err) {
        console.log('error al conectarme a la base de datos');
        throw err
    } else {
        console.log('conexion correcta a mongoDB')

        app.listen(5200, () => {
            console.log('API REST Funcionando en http://localhost:5200')

        })
    }
})
*/
const run = async () => {

    await mongoose.connect(process.env.URL_BASEDATOS, {
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    await app.listen(process.env.PUERTO_SERVIDOR);

    console.log('API REST Funcionando en http://localhost:5200')

}

run().catch(err => console.err(`Fallo al arrancar:' ${err}`));
