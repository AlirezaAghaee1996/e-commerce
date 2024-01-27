import Order from "../models/orderModel.js";
import jwt from 'jsonwebtoken'
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/userModel.js";

export const submitOrder=catchAsync(async(req,res,next)=>{
    // const resBank=await fetch('',{

    // })
    // const dataBank=await resBank.json()
    const {id}=jwt.verify(req.headers['authorization'].split(' ')[1],process.env.JWT_SECRET)
    const dataBank={
        status:false
    }
    const {cart}=await User.findById(id)
    if(dataBank.status){
        const newOrder=await Order.create({
            orderList:cart,
            userId:id,
            orderStatus:'paid'
        })
         res.status(200).json({
            success:true,
            message:'order paid successfully'
        })
    }else{
        const newOrder=await Order.create({
            orderList:cart,
            userId:id,
            orderStatus:'paid'
        })
         res.status(400).json({
            success:false,
            message:'order payment failed'
        })
    }
    await User.findByIdAndUpdate(id,{cart:[]})

})