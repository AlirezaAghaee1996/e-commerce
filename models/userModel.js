import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,'email is required'],
        match:[/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,'email invalid']
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[8,'min length password 8 character']
    },
    phone:{
        unique:true,
        type:String,
        default:'',
        match:[/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,'phone invalid']
    },
    role:{
        type:String,
        enum:['admin','user','shopkeeper','superAdmin'],
        default:'user'
    },
    fullName:{
        type:String,
        required: [true, 'full name is required'],
        minlength:[3,'fullName too short'],
        maxlength:[50,'fullName too long'],
        trim:true
    },
    address:{
        type:String,
        minlength:[3,'address too short'],
        maxlength:[250,'address too long'],
        trim:true,
        required:true,
        default:'no address'
    },
    image:{
        type:String,
    },
    shopkeeperConfirmed:{
        type:Boolean,
        default:false
    },
    cart:{
        type:Array,
        default:[]
    },
    token:{
        type:String,
    },
    expireTimeToken:{
        type:String,
    }
},{timestamp:true})

const User=mongoose.model('User',UserSchema)
export default User