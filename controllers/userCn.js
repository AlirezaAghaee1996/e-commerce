import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiFeatures from "../utils/apiFeatures.js";
import { catchAsync } from "../utils/catchAsync.js";
import HandleERROR from "../utils/handleError.js";
import adminCheck from "../middleware/adminCheck.js";
import smsHandler, { otpSmsHandler } from "../utils/smsHandler.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const isAdmin = adminCheck(req.headers.Authorization);
  if (!isAdmin) {
    return next(new HandleERROR("You are not authorized to perform this", 401));
  }
  const features = new ApiFeatures(User, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const users = await features.query;
  res.status(200).json({ status: 200, data: users });
});

export const register = catchAsync(async (req, res, next) => {
  const { password, role, shopkeeperConfirmed, ...userInfo } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = await User.create({ password: hashedPassword, ...userInfo });
  res.status(201).json({
    success: true,
    message: "Register successfully",
  });
});
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const validateUser = await User.findOne({ email });
  if (!validateUser) {
    res.status(401).json({
      success: false,
      message: "email not found",
    });
  }
  const validatePassword = bcryptjs.compareSync(
    password,
    validateUser.password
  );
  if (!validatePassword) {
    res.status(401).json({
      success: false,
      message: "email or password not correct",
    });
  }
  const { password: pw, ...user } = validateUser;
  // const token = jwt.sign({ id: validateUser.id,role:validateUser.role }, process.env.JWT_SECRET);
  const randomNum = Math.trunc(Math.random() * 10 ** 6);
  const expireTimeToken = new Date().getTime() + 2 * 60 * 1000;
  await User.findByIdAndUpdate(validateUser.id, {
    token: randomNum,
    expireTimeToken: String(expireTimeToken),
  });
  const smsResult = await otpSmsHandler(validateUser.phone, String(randomNum));
  console.log(smsResult);
  res.status(200).json({
    success: true,
    message: "user and password correct",
    data: {
      user,
    },
  });
});
export const otpCodeValidate = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ phone: req.body.phone })
  console.log(user)
  const expire = new Date().getTime();
  console.log(user.expireTimeToken)
  console.log('now time',expire)
  if (+user.expireTimeToken > +expire) {
    if (req.body.otpNum == user.token) {
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      );
      const sendSms = smsHandler("به وب سایت راشد خوش آمدید", user.phone);
      return res.status(200).json({
        success: true,
        data: {
          token,
        },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "کد ورود نامعتبر می باشد",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "کد منقضی می باشد",
    });
  }
});
export const updateProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const accessToken = req.headers.Authorization.slice(" ")[1];
  const verifyId = jwt.verify(accessToken, process.env.JWT_SECRET).id;
  const isAdmin = adminCheck(req.headers.Authorization);
  if (isAdmin || id == verifyId) {
    if (req.body.role && !isAdmin) {
      return next(new HandleERROR("just admin can change role", 401));
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password", "-role");
    res.status(201).json({
      status: "success",
      data: updateUser,
    });
  }
  return next(
    new HandleERROR(
      "You do not have permission to perform this action on this account",
      401
    )
  );
});
export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const accessToken = req.headers.Authorization.slice(" ")[1];
  const verifyId = jwt.verify(accessToken, process.env.JWT_SECRET).id;
  const isAdmin = adminCheck(req.headers.Authorization);
  if (isAdmin || id == verifyId) {
    await User.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      message: "user removed",
    });
  }
  return next(
    new HandleERROR(
      "You do not have permission to perform this action on this account",
      401
    )
  );
});

export const shopkeeperRegister = catchAsync(async (req, res, next) => {
  const { password, role, shopkeeperConfirmed, ...userInfo } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = await User.create({
    password: hashedPassword,
    role: "shopkeeper",
    ...userInfo,
  });
  res.status(201).json({
    success: true,
    message: "Register successfully",
  });
});
