import { Router } from "express";
import { createValidation } from "../middlewares/user/createValidation";
import {
  userController
} from "../controllers/user";

const router = Router();

router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);
router.post("/", createValidation, userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
