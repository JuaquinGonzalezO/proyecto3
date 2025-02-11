import {Schema, model } from "mongoose";

const Add_appointmentSchema = Schema({
    name:{
        type:String,
        required: true
    },

    symptom:{
        type: String
    },

     description:{
        type: String,
        required: true

     },
     keeper:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        require : true

    },
    status:{
        type : Boolean,
        default: true
    },
     
    TimeStamps: true,
    versionKey: false

});

export default model ('Add_appointment', Add_appointmentSchema)