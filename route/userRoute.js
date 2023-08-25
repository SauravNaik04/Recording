import express from "express";
import {
  testController,
  userLogin,
  userRegister,
} from "../controller/userController.js";
import { requireSignIn } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", userRegister);

router.post("/login", userLogin);

router.get("/test", requireSignIn, testController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
