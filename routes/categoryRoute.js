import  express  from "express";
import { addCategory, getAllCategory, removeCategory, updateCategory } from "../controllers/categoryCn.js";
const categoryRouter=express.Router()
categoryRouter.route('/').get(getAllCategory).post(addCategory)
categoryRouter.route('/:id').patch(updateCategory).delete(removeCategory)
export default categoryRouter