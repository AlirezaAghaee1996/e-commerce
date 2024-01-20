import  express  from "express";
import { addProduct, getAllProduct } from "../controllers/productCn.js";
import { addProductMw } from "../middleware/addProductMw.js";
const productRouter=express.Router()
productRouter.route('/').get(getAllProduct).post(addProductMw,addProduct)
export default productRouter