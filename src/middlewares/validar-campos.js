import { validationResult } from "express-validator";

export const  validarCampos =(req, res,next)=>{
    const erors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(erors);

    }
    next()
}