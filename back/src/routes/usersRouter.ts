import { Router } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
} from "../controllers/usersController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
