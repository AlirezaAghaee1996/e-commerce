import  express  from "express";
import { isLogin } from "../middleware/isLogin.js";
import { addToCart, clearCart, getCartItem } from "../controllers/cartCn.js";





const cartRouter=express.Router()
cartRouter.route('/').get(isLogin,getCartItem).patch(isLogin,addToCart).delete(isLogin,clearCart)
export default cartRouter