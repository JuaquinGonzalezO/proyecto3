import Add_appointment from "./add_appointment.js";
import User from "../users/user.model.js"
import { query } from "express";

export const saveAdd_appointment = async (req, res)=>{
    try {
        const data = req.body;
        const user = await User.finOne({email: data.email});
        console.log(user)

        if(!user){
            return res.status(404).json({
                succes: false,
                message: ''
            })
        }
        const add_appointment = new Add_appointment({
            ...data,
            keeper: user
        });

        await add_appointment.save();
         res.status(200).json({
            succes: true,
            add_appointment
         })

    } catch (error) {
        res.status(500).json({
            succes: false,
            message:'',
            error

        })
        
    }
}

export const getAdd_appointment = async (req, res)=>{
    const { limite = 10, desde = 0 }= req.query;
    
}