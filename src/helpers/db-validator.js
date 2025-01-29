import Role from '../role/role.model';
import User from '../users/user.model';

export const esRoleValido =async(role = '')=>{
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El rol${role}  no existe en la base de datos`);


    }


}

export const existenteEmail = async(correo = '')=>{
    const existenteEmail = await User.findOne({corre});


    if(existenteEmail){
        throw new Erro (`El correo ${correo} no existe este correo en la base de datos`)
    }
}