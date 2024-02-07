import  express  from "express";
import { deleteUser, getAllUsers, login, otpCodeValidate, register, shopkeeperRegister, updateProfile } from "../controllers/userCn.js";
const userRouter=express.Router()
userRouter.route('/').get(getAllUsers).post(login)
userRouter.route('/:id').delete(deleteUser).patch(updateProfile)
userRouter.route('/register').post(register)
userRouter.route('/shopkeeper-register').post(shopkeeperRegister)
userRouter.route('/verify').post(otpCodeValidate)

export default userRouter