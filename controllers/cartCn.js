import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import HandleERROR from "../utils/handleError.js";
import Product from "../models/productModel.js";
export const clearCart = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers["authorization"].split(" ")[1],
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate(id, { cart: [] });
  res.status(200).json({
    success: true,
    message: "Your cart has been cleared",
  });
});
export const addToCart = catchAsync(async (req, res, next) => {
  const { name, price, discountPrice, images, shopkeeperId, quantity } =
    await Product.findById(req.body.productId);
  const { id } = jwt.verify(
    req.headers["authorization"].split(" ")[1],
    process.env.JWT_SECRET
  );
  if (req.body.productId && req.body.quantity) {
    if (quantity < req.body.quantity) {
      return next(new HandleERROR("Quantity is not enough", 400));
    }
    const { cart } = await User.findById(id);
    let productInCart = false;
    let newCart = cart?.filter((e) => {
      if (e.productId == req.body.productId) {
        e.quantity = parseInt(req.body.quantity);
        productInCart = true;
        if (+e.quantity <= 0) {
          return false;
        }
        return e;
      }
      return e;
    });
    if (!productInCart) {
      if (quantity < req.body.quantity) {
        return next(new HandleERROR("Quantity is not enough", 400));
      }
      newCart.push({
        productId: req.body.productId,
        name,
        price,
        discountPrice,
        images,
        shopkeeperId,
        quantity: req.body.quantity,
      });
    }
    const newCartUser = await User.findByIdAndUpdate(
      id,
      { cart: newCart },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      data: newCartUser.cart,
      message: `add cart successfully`,
    });
  } else {
    return next(new HandleERROR("Data is incomplete", 400));
  }
});
export const getCartItem = catchAsync(async (req, res, next) => {
  const { id } = jwt.verify(
    req.headers["authorization"].split(" ")[1],
    process.env.JWT_SECRET
  );
  const { cart } = await User.findById(id);
  let message;
  let newCart=[]
  for(let e of cart){
    const { quantity, name } = await Product.findById(e.productId);
    if (quantity <= 0) {
        e.quantity = "-1";
        message = "product does not exist";
      } else if (quantity < e.quantity) {
        e.quantity = quantity;
        message = `only ${quantity} of ${name} exist`;
      } 
      newCart.push(e)
  }
  res.status(200).json({
    success: true,
    message,
    cart: newCart,
  });
});
