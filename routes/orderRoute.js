import  express  from "express";
import { getAllOrder, shopkeeperOrderReceive, submitOrder } from "../controllers/orderCn.js";
const orderRouter=express.Router()
orderRouter.route('/bank').get(submitOrder)
orderRouter.route('/').get(getAllOrder)
orderRouter.route('/owner').get(shopkeeperOrderReceive)

export default orderRouter