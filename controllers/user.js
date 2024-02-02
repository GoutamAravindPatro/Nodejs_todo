import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
  // this will return all the users from the User Collection
  const users = await User.find({});

  const keyword = req.query.keyword;
  console.log(keyword);

  res.json({
    success: true,
    users,
  });
};

export const newUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  // checking whether the user has already registered with the given mail -
  let user = await User.findOne({ email });

  if(user) return next(new ErrorHandler("User Already exists", 400));

  //creating a hashed password
  const hashPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    email,
    password: hashPassword,
  });

  sendCookie(User, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
 try {
  const { email, password } = req.body;

  // added password also to later on reuse it while comparing 
  const user = await User.findOne({ email }).select("+password");

  if(!user) return next(new ErrorHandler("Invalid email or Password", 400));

  const isMatch = await bcrypt.compare(password, user.password)

  if(!isMatch) return next(new ErrorHandler("Invalid email or Password", 400));
  
  sendCookie(user, res, `welcome back ${user.name}`, 200);
 } catch (error) {
  next(error);
 }
};

export const getUserById =  (req, res) => {
  //const {id} = req.query;
  //const {id} = req.body; -- in this case the user should share the id in the body in json IN POSTMAN
  // const { id } = req.params;
  // ! req.params is used to access parameters embedded within the URL path of a request. - url/user/special REFER TO ABOVE GET API. So basically in this case the current get will be ignored which is a problem so it is always recommended to use the dynamic route at the end of code.
  //req.query is used to access query parameters added to the end of a URL, following a question mark (?). -  url/user?id=special

  res.status(200).json({
    success: true,
    user : req.user,
  });
};


export const logout =  (req, res) => {
// Emptying or deleting the cookie value 
  res.status(200).cookie("token","",{expires: new Date(Date.now()) ,
    sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure : process.env.NODE_ENV === "Development" ? false : true
  }).json({
    success: true,
    user : req.user,
  });
};