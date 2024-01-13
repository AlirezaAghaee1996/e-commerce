import mongoose from "mongoose";
const CommentSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,

    },
    message:{
        type:String,
        required:true,
        maxlength:[250,'max 250']
    },
    productId:{
        type:String,
        required:true,
    }
},{timestamps:true})
const Comment=mongoose.model('Comment',CommentSchema)
export default Comment
