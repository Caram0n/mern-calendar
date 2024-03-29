/*
    Rutas de Usuarios / Auth
    host + /api/events
*/



const {Router} = require('express')
const {check} = require('express-validator')

const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events')
const {validarJWT} = require('../middlewares/validar-jwt')
const {validarCampos} = require('../middlewares/validar-campos')
const {isDate} = require('../helpers/isDate')


const router = Router()
router.use(validarJWT)

// Todas tienen que pasar por la validación del JWT
// Obtener eventos
router.get('/', getEventos)

// Crear eventos
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento)

// Actualizar eventos
router.put('/:id', actualizarEvento)

// Eliminar eventos
router.delete('/:id', eliminarEvento)


module.exports = router