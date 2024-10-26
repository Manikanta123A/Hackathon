import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpStatus from "http-status";
export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:5000/api/user"
})

export const AuthProvider = ({children})=>{
    const authContext = useContext(AuthContext)

    const [username, setUsername] = useState(authContext)
    const router = useNavigate();

    const handleRegister = async(Mail,username, password)=>{
        try{
            let request = await client.post("/register", {
                Mail:Mail,
                username:username,
                password:password
            })

            if(request.status === httpStatus.CREATED ){
                return request.data.message;
            }
        }catch(err){
            throw err;
        }
    }

    const handleLogin = async(username, password)=>{
        try{
            let request = await client.post('/login', {
                username:username,
                password:password
            })
            if(request.status === httpStatus.OK){
                localStorage.setItem("token", request.data.token)
                return request.data.message;
            }
        }catch(err){
            throw err;
        }
    }

    const data = {username, setUsername,handleLogin, handleRegister};
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}