import express from "express";
import {
  getAllUsers,
  newUserRegister,
  getUserById, 
  login, logout
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", newUserRegister);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getUserById);

export default router;
