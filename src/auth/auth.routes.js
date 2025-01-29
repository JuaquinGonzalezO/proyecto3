import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller";
import { validarCampos } from "../middlewares/validar-campos";
import { ExpressValidator } from "express-validator";
import { esRoleValido, existenteEmail } from "../helpers/db-validator";

const router = Router();

router.post(
    '/login',
    [
        check('correo','Este no es un correo valido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login,
);

router.post(
    '/registrer',
   
   [ check('nombre','El nombre es obligatorio'),
    check('password','El password debe ser mayor a 6 digitos').isLength({min:6}),
    check('correo',' Este no es un correo valido').isEmail(),
   check('correo').custom(existenteEmail),
    check('role').custom(esRoleValido),
    check('phone','El telefono debe contener 8 numeros').isLength({min:8 ,max:8}),
    validarCampos,

],
register
)