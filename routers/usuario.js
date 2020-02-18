var controller = require('../controller/usuario');
var express = require('express');
var tokenVerify = require('./routerVerify')
var router = express.Router()


router.get('/', /*tokenVerify.validarToken,*/ controller.getAll); // lista todos los usuarios
router.get('/:id', controller.getById); // muestra los datos de un 1 usuario

router.get('/:id/puntuacion', controller.getPuntuacionesUsuario) // 

router.post('/', controller.registrar); // registra un nuevo usuario
router.post('/login', controller.login); // login del usuario (obtiene el token)

router.delete('/:id', controller.remove); // borra un usuario (falta borarr sus puntuaciones)

router.put('/:id', controller.update); // modifica un usuario

router.post('/:id/puntuacion', controller.insertaPuntuacion)//añadir puntuacion a usuario
//obtener puntuaciones que tie eun usuario
//borrar puntuacion de un usuario en particular

module.exports = router;

