import  express  from "express";
import { search } from "../controllers/searchCn.js";
const searchRouter=express.Router()
searchRouter.route('/').post(search)


export default searchRouter