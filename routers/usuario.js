var controller = require('../controller/usuario');
var express = require('express');
var tokenVerify = require('./routerVerify')
var router = express.Router()


router.get('/', /*tokenVerify.validarToken,*/ controller.getAll);
router.get('/:id', controller.getById);

router.get('/:id/puntuacion', controller.getPuntuacionesUsuario)

router.post('/', controller.registrar);
router.post('/login', controller.login);

router.delete('/:id', controller.remove);

router.put('/:id', controller.update);

router.post('/:id/puntuacion', controller.insertaPuntuacion)//añadir puntuacion a usuario
//obtener puntuaciones que tie eun usuario
//borrar puntuacion de un usuario en particular

module.exports = router;

