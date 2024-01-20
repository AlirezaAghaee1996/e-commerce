import User from "../models/userModel.js"
import  jwt  from "jsonwebtoken"
const adminCheck=async(token)=>{
    const accessToken=token.split(' ')[1]
    const {id}=jwt.verify(accessToken,process.env.JWT_SECRET)
    const user= await User.findById(id)
    if(user.role==='admin' || user.role==='superAdmin'){
        return true
    }
   return false
}
export default adminCheck