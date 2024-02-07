import mongoose from "mongoose";
const shopkeeperOrderSchema=new mongoose.Schema({
    shopkeeperId:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerAddress:{
        type:String,
        required:true
    },
    product:{
        type:Array,
        required:true
    }
})

const ShopkeeperOrder=mongoose.model('shopkeeperOrder',shopkeeperOrderSchema)
export default ShopkeeperOrder
