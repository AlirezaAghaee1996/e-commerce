import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import { catchAsync } from "../utils/catchAsync.js";
export const search = catchAsync(async (req, res, next) => {
  const { query } = req.body;
  if (!query) {
    return res.status(204).json({ message: "You must provide a query" });
  }
  let products = await Product.find({name:{$regex:query}}).select(['id','name','slug','image'])
  let category = await Category.find({name:{$regex:query}}).select(['id','name','image','slug'])
  return res.status(200).json({
    succuss:true,
    data:{
        products,
        category
    }
  })
});
