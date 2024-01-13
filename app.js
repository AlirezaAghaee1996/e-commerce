import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import userRouter from './routes/userRoute'
import productRouter from './routes/productRoute'
import categoryRouter from './routes/categoryRoute'
import commentRouter from './routes/commentRoute'
import orderRouter from './routes/orderRoute'
import searchRouter from './routes/searchRoute'
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

export default app