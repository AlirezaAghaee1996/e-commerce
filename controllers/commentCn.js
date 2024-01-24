import Comment from "../models/commentModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from 'jsonwebtoken'

export const getAllProductComments=catchAsync(async(req,res,next)=>{
    const {productId}=req.params
    const comments=await Comment.find({productId})
    res.status(201).json({
        success:true,
        data:comments
    })
})
export const addComment=catchAsync(async(req,res,next)=>{
    const {productId}=req.params
    const {id}=jwt.verify(req.headers['authorization'].split(' ')[1],process.env.JWT_SECRET)
    const comment=await Comment.create({userId:id,productId,...req.body})
    res.status(201).json({
        success:true,
        message:'comment sent'
    })
})
export const removeComment=catchAsync(async(req,res,next)=>{
    const {commentId}=req.params //product id ==> comment Id
    const {id,role}=jwt.verify(req.headers['authorization'].split(' ')[1],process.env.JWT_SECRET)
    const comment=await Comment.findById(commentId)
    if(id===comment.userId || role==='admin'||role==='superAdmin'){
        await Comment.findByIdAndDelete(commentId)
        return res.status(200).json({
            success:true,
            message:'comment deleted'
        })
        
    }
    res.status(401).json({
        success:false,
        message:'you cant deleted Comment'
    })
})
