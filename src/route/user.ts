import express from "express";
import {
  createUser,
  getUser,
  getUserById,
  updateUserById,
} from "../handler/user";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);

export default router;
