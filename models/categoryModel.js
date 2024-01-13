import mongoose from 'mongoose'
const CategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'category is required'],
        unique:true
    },
    images:{
        type:[String],
        required:[true,'image is required']
    },
    subCategory:{
        type:[String]
    }
    
})
CategorySchema.pre('save', function (next) {
    this.slug=slugify(this.name,{lower:true})
    next()
})