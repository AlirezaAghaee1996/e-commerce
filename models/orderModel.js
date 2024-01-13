import mongoose from "mongoose";
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },
    quantity:{
        type:Number,
        default:1,
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    priceDiscount:{
        type:Number
    },
    productImage: {
        type: String,
        required: true
    }
});
const OrderSchema=new mongoose.Schema({
    products: [productSchema],
    orderStatus:{
        type:String,
        enum:['pending','paid'],
        default:'pending'
    },
    userId:{
        type:String,
        required: true
    },
    shopkeeperId:{
        type:String,
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
})
OrderSchema.pre('save', function (next) {
    let total=0
    this.products.map(e=>{
        total+= e.priceDiscount?e.priceDiscount*e.quantity:e.productPrice*e.quantity
    })
    this.totalAmount=total
    next()
})
const Order=mongoose.model('Order',OrderSchema)
export default Order
