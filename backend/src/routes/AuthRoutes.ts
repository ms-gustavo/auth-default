import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateDTO } from "../middlewares/validateDTO";
import { RegisterUserDTO } from "../dtos/AuthDTO/register";

const authController = AuthController();
const router = Router();

router.post(
  "/register",
  validateDTO(RegisterUserDTO),
  authController.registerTempUser
);

export default router;
