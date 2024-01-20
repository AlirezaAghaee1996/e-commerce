import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import commentRouter from './routes/commentRoute.js'
import orderRouter from './routes/orderRoute.js'
import searchRouter from './routes/searchRoute.js'
import HandleERROR from './utils/handleError.js'
import { catchError } from './utils/catchError.js'
const app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
//Routes
app.use('/api/v1/user',userRouter)
app.use('/api/v1/product',productRouter)
app.use('/api/v1/category',categoryRouter)
app.use('/api/v1/comment',commentRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/search',searchRouter)
app.use('*',(req,res,next)=>{
    next(new HandleERROR(`can't find ${req.originalUrl} url on server`,404))
})
app.use(catchError)

export default app