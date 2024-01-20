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
export const getProduct=catchAsync(async(req,res,next)=>{
    const {productId}=req.params
    const product=await Product.findById(productId)
    res.status(200).json({
        success:true,
        data:product
    })
})
export const updateProduct=catchAsync(async(req,res,next)=>{
    const {productId}=req.params
    const updateProduct=await Product.findByIdAndUpdate(productId,req.body,{
        new:true
    })
    res.status(201).json({
        success:true,
        message:'Product updated',
        data:updateProduct
    })
 
})
export const removeProduct=catchAsync(async(req,res,next)=>{
    const {productId}=req.params
    await Product.findByIdAndDelete(productId)
    res.status(201).json({
        success:true,
        message:'Product removed',
        data:null
    })
 
})