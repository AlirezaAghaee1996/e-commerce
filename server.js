import app from './app.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config({path:'./config.env'})
const PORT = process.env.PORT || 5000;
// Testing the server connection
mongoose.connect(process.env.DATA_BASE_URI).then(()=>{
    console.log('DataBase Connected')
}).catch(err=>console.log(err))

app.listen(PORT,()=>{
    console.log('server start')
})
