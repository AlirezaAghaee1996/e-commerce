import User from "../models/userModel.js"
import  jwt  from "jsonwebtoken"
const adminCheck=(token)=>{
    const accessToken=token.slice(' ')[1]
    const {id}=jwt.verify(accessToken,process.env.JWT_SECRET)
    const user= User.findById(id)
    if(user.role==='admin' || user.role==='superAdmin'){
        return true
    }
   return false
}
export default adminCheck