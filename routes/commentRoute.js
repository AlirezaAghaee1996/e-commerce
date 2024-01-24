import  express  from "express";
import { addComment, getAllProductComments, removeComment } from "../controllers/commentCn.js";
import { isLogin } from "../middleware/isLogin.js";
const commentRouter=express.Router()
commentRouter.route('/:productId').get(getAllProductComments).post(isLogin,addComment)
commentRouter.route('/:commentId').delete(removeComment)


export default commentRouter