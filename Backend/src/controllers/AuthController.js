import httpStatus from "http-status";
import { hash } from "bcrypt";
import bcrypt from 'bcrypt';
import { user } from "../models/AuthenticateSchema.js";
import crypto from 'crypto'

const login = async(req,res)  => { 
    const {username, password} = req.body;
    if(!username,!password){
        res.status(400).json({message:"please provide details"})
    }else{
        try{
            const curruser = await user.findOne({username:username});
            if(!curruser){
                res.status(httpStatus.NOT_FOUND).json({message:"user not found"});
            }else{
                let checkPass = await bcrypt.compare(password,curruser.password);
                if(checkPass){
                    let token = crypto.randomBytes(20).toString("hex");
                    curruser.token = token;
                    curruser.save();
                    res.status(httpStatus.OK).json({message:"login Sucess",token:token});
                }else{
                    res.status(httpStatus.NOT_FOUND).json({message:"INCORRECT PASSWORD"});
                }
            }
        }
        catch(e){
            res.status(500).json({message:"Something went wrong"});
        }
    }
}
const register = async(req,res)=>{
    const {Mail, username, password} = req.body;
    try{
        const existingUser = await user.findOne({username:username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"User Already Exists"});
        }
        const hashpassword = await bcrypt.hash(password,10);
        const newUser = new user({
            Mail: Mail,
            username:username,
            password:hashpassword
        })
        await newUser.save();
        res.status(httpStatus.CREATED).json({message:"Created sucessfully"});

    }
    catch(e){
        res.status(500).json({message:e.message});
    }
}
export {login, register};