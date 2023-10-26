import { Router } from "express";
import { createValidation } from "../middlewares/user/createValidation";
import { authController } from "../controllers/auth";

const router = Router();

router.post("/signup", createValidation, authController.signup);
router.post("/login", authController.login);

export default router;
