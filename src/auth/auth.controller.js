import bcryptjs from 'bcryptjs';
import Usuario from '../helpers/generate-jwt'
import { gernerarJWT } from '../helpers/generate-jwt';

export const login = async (req, res, )=>{
 const {correo, password}=req.body;

 try {
    const usuario = await Usuario.findOne({correo});

    if(!usuario){
        return res.status(400).json({
            msg: 'Credenciales incorrectas, Correo no exist en la base de datos'
        })
    }
    if(!usuario.estado){
        return res.status(400).json({
            msg: 'El usuario no existe en la base de datos'
        })
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if(!usuario){
        return res.status(400).json({
            msg: 'La contraseña es incorrecta'
        })
    }

    const token = await gernerarJWT(usuario.id);
    res.status(200).json({
        msg:'Login ok!!!',
        usuario,
        token
    })

 } catch (e) {
    console.log(e);
    res.status(500).json({
        msg:"Comuniquese con  el administrador"
    })
    
 }
}

export const register = async(req, res) =>{
    const {nombre, correo, password, role ,phone} =req.body;
    const user = new Usuario({nombre,correo, password,role,phone});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();
    res.status(200).json({
        user,
    })
}