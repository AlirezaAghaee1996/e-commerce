import mongoose from "mongoose";
const mongoose = require('mongoose');


const OrderSchema=new mongoose.Schema({
    orderList:{
        type:Array,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['failed','paid'],
    },
    userId:{
        type:String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    totalAmount: {
        type: Number,
        required: true
    },
})
OrderSchema.pre('save', function (next) {
    let total=0
    this.orderList?.map(e=>{
        total+= e.priceDiscount?e.priceDiscount*e.quantity:e.productPrice*e.quantity
    })
    this.totalAmount=total
    next()
})
const Order=mongoose.model('Order',OrderSchema)
export default Order
