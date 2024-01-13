import { catchAsync } from "../utils/catchAsync.js"
import Category from "../models/categoryModel.js"
import ApiFeatures from "../utils/apiFeatures.js"
import adminCheck from "../middleware/adminCheck.js"
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
    const isAdmin=adminCheck(req.headers.Authorization)
})