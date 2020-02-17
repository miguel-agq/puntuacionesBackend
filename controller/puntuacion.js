var Puntuacion = require('../models/puntuacion')


async function getAll(req, res) {
    //callbacks
    /* Puntuacion.find({}).exec((err, puntuaciones) => {
         if (err) {
             res.status(500).send({ accion: 'get all', mensaje: 'error al obtener la puntuacion' })
         } else {
             res.status(200).send({ accion: 'get all', datos: puntuaciones })
         }
     });*/

    // promesas
    /*
    Puntuacion.find({}).exec()
        .then( puntuaciones => res.status(200).send({ accion: 'get all', datos: puntuaciones })  )
        .catch( err => res.status(500).send({ accion: 'get all', mensaje: `error al obtener la puntuacion ${err}` }) )
    */

    //async await
    try {
        let puntuaciones = await Puntuacion.find()
        res.status(200).send({ accion: 'get all', datos: puntuaciones })
    } catch (err) {
        res.status(500).send({ accion: 'get all', mensaje: `error al obtener la puntuacion ${err}` })
    }
};


async function getById(req, res) {
    /*let puntuacionId = req.params.id;

    Puntuacion.findById(puntuacionId).exec((err, puntuacion) => {
        if (err) {
            res.status(500).send({ accion: 'get one', mensaje: 'error al obtener la puntuacion' })
        } else {
            res.status(200).send({ accion: 'get one', datos: puntuacion })
        }
    })*/

    try {
        let puntuacionId = req.params.id;
        let puntuacion = await Puntuacion.findById(puntuacionId)
        res.status(200).send({ accion: 'get all', datos: puntuacion })
    } catch (err) {
        res.status(500).send({ accion: 'get one', mensaje: `error al obtener la puntuacion ${err}` })
    }
};


async function insert(req, res) {
    /*
    var datos = req.body;

    var puntuacion = new Puntuacion();
    puntuacion.nombre = datos.nombre;
    puntuacion.puntuacion = datos.puntuacion;
    puntuacion.save((err, puntuacionGuardada) => {
        if (err) {
            res.status(500).send({ accion: 'save', mensaje: 'error al guardar la puntuacion' });
        } else {
            res.status(200).send({ accion: 'save', datos: puntuacionGuardada });
        }
    })*/
    try {
        var puntuacion = new Puntuacion(req.body);
        puntuacion._id = undefined;
        let puntuacionGuardada = await puntuacion.save()
        res.status(200).send({ accion: 'save', datos: puntuacionGuardada })
    } catch (err) {
        res.status(500).send({ accion: 'save', mensaje: `error al guardar la puntuacion ${err}` })
    }
};


async function remove(req, res) {
    /*
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndDelete(puntuacionId, (err, puntuacionBorrada) => {
        if (err) {
            res.status(500).send({ accion: 'delete', mensaje: 'error al borrar la puntuacion' });
        } else if (!puntuacionBorrada) {
            res.status(404).send({ accion: 'delete', mensaje: 'error el id a borrar no existe' })
        }
        else {
            res.status(200).send({ accion: 'delete', datos: puntuacionBorrada });
        }
    });*/
    try {
        var puntuacionId = req.params.id;
        let puntuacionBorrada = await Puntuacion.findByIdAndDelete(puntuacionId)
        if (!puntuacionBorrada) {
            return res.status(404).send({ accion: 'delete', mensaje: 'error el id a borrar no existe' })
        } else {
            res.status(200).send({ accion: 'delete', datos: puntuacionBorrada })
        }
    } catch (err) {
        res.status(500).send({ accion: 'delete', mensaje: `error al borrar la puntuacion ${err}` })
    }
};


async function update(req, res) {
    /*
    var datos = req.body;
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndUpdate(puntuacionId, datos, (err, puntuacionActualizada) => {
        if (err) {
            res.status(500).send({ accion: 'update', mensaje: 'error al modificar la puntuacion' });
        } else if (!puntuacionActualizada) {
            res.status(404).send({ accion: 'delete', mensaje: 'error el id a actualizar no existe' })
        } else {
            res.status(200).send({ accion: 'update', datos: puntuacionActualizada });
        }
    })*/
    try {
        var datos = req.body;
        let puntuacionId = req.params.id;
        let puntuacionActualizada = await Puntuacion.findByIdAndUpdate(puntuacionId, datos)
        if (!puntuacionBorrada) {
            return res.status(404).send({ accion: 'update', mensaje: 'error el id a actualizar no existe' })
        } else {
            res.status(200).send({ accion: 'update', datos: puntuacionActualizada })
        }
    } catch (err) {
        res.status(500).send({ accion: 'update', mensaje: `error al actualizar la puntuacion ${err}` })
    }
};


module.exports = { getAll, getById, insert, remove, update };