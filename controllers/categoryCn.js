import { catchAsync } from "../utils/catchAsync.js"
import Category from "../models/categoryModel.js"
import ApiFeatures from "../utils/apiFeatures.js"
import adminCheck from "../middleware/adminCheck.js"
import HandleERROR from "../utils/handleError.js"
export const getAllCategory=catchAsync(async(req,res,next)=>{
    const features = new ApiFeatures(Category, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const category=await features.query
    res.status(200).json({
        success:true,
        data:category
    })
})
export const addCategory=catchAsync(async(req,res,next)=>{
    const isAdmin=adminCheck(req.headers["authorization"])
    
    if(isAdmin){
        const cat= await Category.create(req.body);
        res.status(201).json({
            success: true,
            message:"Category created",
        })
    }else{
        return next(new HandleERROR("You are not authorized to perform this",401))
    }
})

export const removeCategory=catchAsync(async(req,res,next)=>{
    const isAdmin=adminCheck(req.headers["authorization"])
    const {id}=req.params
    if(isAdmin){
        const cat= await Category.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message:"Category removed",
        })
    }else{
        return next(new HandleERROR("You are not authorized to perform this",401))
    }
})

export const updateCategory=catchAsync(async(req,res,next)=>{
    const isAdmin=adminCheck(req.headers["authorization"])
    const {id}=req.params
    if(isAdmin){
        const cat= await Category.findByIdAndUpdate(id,req.body,{
            new:true
        });
        res.status(201).json({
            success: true,
            message:"Category updated",
            data:cat
        })
    }else{
        return next(new HandleERROR("You are not authorized to perform this",401))
    }
})