import { Router } from "express";
import { registerUser } from "../services/auth.service";


export const authRouter=Router();


authRouter.post("/register",async (req,res,next)=>{
    try{
        const {email,password}=req.body
        // should not write service login here it should be in servoce file
        await registerUser(email,password)

        res.status(210).json({
            success:true,
            message:"Registeration successsful. Please login to continue"
        })
    }catch(error){
        next(error)
    }


})