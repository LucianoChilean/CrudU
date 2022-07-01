const { Router } = require('express');
const { check }  = require('express-validator');


//Obtiene los middlewares desde el archivo index en la carpeta misma


const {
  ValidarCampos,
  validarJWT
} = require('../middlewares');


const {getUsuarios,
       getUsuario,
       postUsuario,
       putUsuario, 
       deleteUsuario } = require('../controller/usuarios');

const router = Router();


router.get('/',[validarJWT],getUsuarios);

router.get('/:id',[validarJWT],getUsuario);

router.post('/',[
  check('email','El correo es obligatorio').isEmail(),
  check('password','La contraseña es obligatoria').not().isEmpty(),
  ValidarCampos
],postUsuario);

router.put('/:id',[validarJWT],putUsuario);

router.delete('/:id',[validarJWT],deleteUsuario);




module.exports = router;
