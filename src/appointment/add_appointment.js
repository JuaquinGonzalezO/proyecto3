import { Router } from "express";
import {check} from "express-validator"
import { getAdd_appointment, saveAdd_appointment } from "./add_appointmentController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/"
    [
        validarJWT,
        check('appointment', '').not().isEmpty(),
        validarCampos
    ],
    saveAdd_appointment
)
router.get("/",getAdd_appointment)