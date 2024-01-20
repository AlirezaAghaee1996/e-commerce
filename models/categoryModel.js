import mongoose from 'mongoose'
import slugify from 'slugify'
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
const Category=mongoose.model('Category',CategorySchema)
export default Category