import mongoose from "mongoose";
 

const UserSchemas = mongoose.Schema({
    nombre: {
        type : String,
        required : [true, "El nombre es requerido"],
    },
    coreo: {
        type : String,
        required : [true, "El correo es requerido"],
        unique: true,
    },

    password: {
        type: String,
        required:[true, "La contraseña es requerida"]
    },
    img:{
        type: String,
    },

    phone:{
        type : String,
        minLength : 8,
        maxLength: 8,
        required: true,
    },
    role:{
        type:String,
        required: true,
        enum:["ADMIN_ROLE","USER_ROLE"],
    }   ,

    estado:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    }

});

UserSchemas.methods.toJSON = function(){
    const {___v, password, _id ,...usuario} = this.toObject();
    usuario.uid =_id;
    return user;

}

export default mongoose.model('User',UserSchemas)