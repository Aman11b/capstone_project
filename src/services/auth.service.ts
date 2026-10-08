import { createSecureServer } from "node:http2";
import { BCRYPT_SALT_ROUNDS, PASSWORD_MIN_LENGTH } from "../constants/auth.constants";
import { AppError } from "../errors/AppError";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcryptjs"

export async function registerUser(email:string,password:string):Promise<void> {

    if(!email || !password){
        throw new AppError(400,"Email and password is required")
    }


    if(password.length<PASSWORD_MIN_LENGTH){
        throw new AppError(400,'Password must be at least 8 characters long')
    }


    const normaliseEmail=email.toLowerCase().trim();


    // find user in DB -> if already present dont allow


    const existingUser = await findUserByEmail(normaliseEmail)

    if(existingUser){
        throw new AppError(409,"Email already exists.")
    }

    const passwordHash=await bcrypt.hash(password,BCRYPT_SALT_ROUNDS)


    await createUser(normaliseEmail,passwordHash)
    
}