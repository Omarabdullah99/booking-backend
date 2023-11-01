import express from 'express'
const app= express()
import mongoose from 'mongoose'
import cors from 'cors'
import UserRouter from './routes/users.js'
import AuthRouter from './routes/auth.js'
import HotelsRouter from './routes/hotelRoute.js'
import RoomRouter from './routes/roomRouter.js'
import cookieParser from 'cookie-parser'


//*middleware
app.use(cookieParser())
app.use(cors())
app.use(express.json())

const MONGODB_URL="mongodb+srv://moviedekha42:MfUgUsrLBTSF54wi@lamadev-hostel-booking.schlp4x.mongodb.net/?retryWrites=true&w=majority"

main().catch(err => console.log(err))
async function main(){
    await mongoose.connect(MONGODB_URL);
    console.log('database connected')
  }

//router middleware
app.use('/api/users', UserRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/hotels', HotelsRouter)
app.use('/api/room', RoomRouter)


//error middleware
app.use((err,req,res,next)=>{
   const errorStatus= err.status || 500;
   const errorMessage= err.message || "Something went wrong"
   return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack: err.stack
   })

})


app.get("/",(req,res)=>{
    res.json({status:"success"})
})
app.listen(8800,()=>{
    console.log("Connected to backend !")
})