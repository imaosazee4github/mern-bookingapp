import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/authRoute.js';
import hotelsRoute from './routes/hotelsRoute.js';
import usersRoute from './routes/userRoute.js';
import roomRoute from './routes/roomsRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config()

const app = express()
const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to mongoDB")
        

    }catch(error){
       throw error;
    }

};

// mongoose.connection.on("disconnected", () => {
//     console.log("Mongoose is disconnected");
//     });

    app.use(cors())

    app.use(cookieParser())
    app.use(express.json())
    app.use("/api/auth", authRoute)
    app.use("/api/hotels", hotelsRoute)
    app.use("/api/users", usersRoute)
    app.use("/api/rooms", roomRoute)

    app.use((err,req,res,next) => {
        const errorStatus = err.Status || 500;
        const errorMessages = err.messages || "Something went Wrong!";
        return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        messages:errorMessages,
        stack:err.stack,
    })
    })

app.listen(8800, () => {
    connect()
    console.log('Server is running on port 8800');
    });