import Order from "../models/orderModel.js";
import jwt from 'jsonwebtoken'
import ApiFeatures from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
export const getAllOrder=catchAsync(async(req,res,next)=>{
    const token=req.headers['authorization'].split(' ')[1]
    const {role,id}=jwt.verify(token,process.env.JWT_SECRET)
    if (role==='admin'||role==='superAdmin'){
        const features=new ApiFeatures(Order,req.query).filter().sort().limitFields().paginate()
        const orders=await features.query
        res.status(200).json({
            success:true,
            data:orders
        })
    }else if(role==='shopkeeper'){
        
    }
})
