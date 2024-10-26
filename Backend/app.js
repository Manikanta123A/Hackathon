import express from 'express';
import {createServer} from 'node:http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './src/routes/AuthRoute.js';

const app = express();
const server = createServer(app);
// const io = new Server(server);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
let port = 5000;
app.use(cors())
app.use('/api/user',userRouter)
const start = async() =>{
    const connection = await mongoose.connect("mongodb+srv://gangolamanikanta:bwwKvwvOaL0OHV6z@hacktober.2cnl3.mongodb.net/?retryWrites=true&w=majority&appName=Hacktober");
    console.log(`Mongo Db connected to ${connection.connection.host} `)
    server.listen(port, ()=>{
        console.log("listening to Website");
    })
}
start();