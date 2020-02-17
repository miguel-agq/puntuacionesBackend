var jwt = require('jsonwebtoken')

exports.validarToken = (req, res, next) => { //middleware
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('acceso no autorizado')
    try {
        const verificado = jwt.verify(token, process.env.TOKEN_SECRETO)
        console.log(verificado)
    } catch (err) {
        return res.status(400).send('token no valido')
    }
    next()
}