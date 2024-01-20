import Product from "../models/productModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import ApiFeatures from "../utils/apiFeatures.js";
import jwt from 'jsonwebtoken'
export const getAllProduct=catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Product, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const products=await features.query
    res.status(200).json({
        success:true,
        data:products
    })
})

export const addProduct=catchAsync(async(req,res,next)=>{
    const {id}=jwt.verify(req.headers['authorization'].split(' ')[1],process.env.JWT_SECRET)
    const {shopkeeperId='',...others}=req.body
    const newProduct=await Product.create({shopkeeperId:id,...others})
    res.status(201).json({
        success: true,
        message:"new Product created",
    })
})

