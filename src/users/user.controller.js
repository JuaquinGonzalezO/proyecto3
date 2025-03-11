import { response, request } from "express";
import bcrypt from 'bcryptjs';
import User from "./user.model.js";

export const getUsers = async(req = request, res = response)=>{
try {
    const{ limite = 10, desde = 0}= req.query;
    const query = {estado : true};
    
    const[total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])
    res.status(200).json({
        succes: true,
        total,
        users


    })

   
} catch (error) {
    res.status(500).json({
        succes: false,
        msg:'Error al obtener usuarios',
        error
    })
  }  
  
}
export const getUserById = async(req, res) => {
    try {
            const { id } = req.params;
            const user = await User.findById(id);

            if(!user){
                return req.status(404).json({
                    succes: false,
                    msg: 'usuario not found'
                })
            }

            res.status(200).json({
                succes: true,
                user
            })


    } catch (error) {
        res.status(500).json({
        succes:false,
        msg:'Error al obtener usuarios',
        error  
        })
    }
  }

  export const updateUser = async (req, res = response)=>{
    try {
        const{id} = req.params;
        const{ _id,password, email, ...data}=  req.body;

        if(password){
            data.password = await (password)

        }

        const user = await User.findByIdAndUpdate(id, data,{new: true});
         res.status(200).json({
            succes: true,
            msg:'Usuario Actualizado',
            user
         })


    } catch (error) {
        res.status(500).json({
             succes:false,
            msg:'Error al actualizar Usuario',
            error
        })
    }
  }


  export const updatePassword = async (req, res = response) => {
    const { id } = req.params;
    const { password } = req.body; 
    try {
      
        if (!password) {
            return res.status(400).json({
                success: false,
                msg: 'La nueva contraseña es obligatoria'
            });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            msg: 'Contraseña actualizada con éxito',
            user: {
                uid: user._id,
                name: user.name,
                surname: user.surname,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);  
        return res.status(500).json({
            success: false,
            msg: 'Error interno al actualizar la contraseña',
            error: error.message || error 
        });
    }
};

  export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "Usuario no encontrado" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Usuario eliminado exitosamente",
            deletedUser: user 
        });
    } catch (error) {
     
        res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: error.message 
        });
    }
};