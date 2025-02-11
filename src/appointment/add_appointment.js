import { Router } from "express";
import {check } from "express-validator"
import { getAdd_appointments, saveAdd_appointment, searchAdd_appointment,  deleteAdd_appointment } from "./add_appointmentController.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('appointment', 'El campo appointment es obligatorio').not().isEmpty(),
        validarCampos
    ],
    saveAdd_appointment
)

router.get("/", getAdd_appointments)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    searchAdd_appointment
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        validarCampos
    ],
    deleteAdd_appointment
)

export default router;