import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { userCollection } from '../models/user.model.js';
import CustomError from '../utils/CustomError.util.js';

export const authenticate = expressAsyncHandler(async (req, res, next) => {
  console.log(req.cookies);
  let token = req?.cookies?.token;

  if (!token) {
    return next(new CustomError('Please login to access this', 401));
  }

  let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);
  // { id: '68a6d0bf383e995a928412bf', iat: 1756107869, exp: 1756111469 }

  let user = await userCollection.findById(decodedToken.id);
  if (!user) return next(new CustomError('Invalid session, please login again', 401));

  req.myUser = user;
  next();
});


export const authorize = (req, res, next) => {
  if (req.myUser.role === "admin") {
    console.log("checking role...");
    next();
  } else {
    return next(new CustomError("Only admin can access this resource", 403));
  }
};