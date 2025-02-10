import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { existenteEmail, esRoleValido } from "../helpers/db-validator.js";

export const registerValidator= [
    body ("name", "the name is required").not().isEmpty(),
    body("apellido"," the surname is required").not().isEmpty(),
    body("correo"," you must enter a valid email").isEmail(),
    body("correo").custom(existenteEmail),
    body("role").custom(esRoleValido),
    body("password"," you must enter a valid email").isLength({min:8}),
    validarCampos
];

export const loginValidator=[
        body("email").optional().isEmail().withMessage("enter a valid email address"),
        body ("username").optional().isString().withMessage("enter a valid username"),
        body("password ", "password must be at least 8 characters").isLength({min:8},
            validarCampos
        )
]
