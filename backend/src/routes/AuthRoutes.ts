import { Router } from "express";
import { AuthController } from "../controllers/Auth/AuthController";
import { validateDTO } from "../middlewares/validateDTO";
import { RegisterUserDTO } from "../dtos/AuthDTO/register";
import { LoginUserDTO } from "../dtos/AuthDTO/login";

const authController = AuthController();
const router = Router();

router.get("/confirm/:confirmId", authController.registerUser);
router.post(
  "/register",
  validateDTO(RegisterUserDTO),
  authController.registerTempUser
);
router.post("/login", validateDTO(LoginUserDTO), authController.loginUser);

export default router;
