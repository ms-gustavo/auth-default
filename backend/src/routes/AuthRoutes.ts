import { Router } from "express";
import { AuthController } from "../controllers/Auth/AuthController";
import { validateDTO } from "../middlewares/validateDTO";
import { RegisterUserDTO } from "../dtos/AuthDTO/register";
import { LoginUserDTO } from "../dtos/AuthDTO/login";
import passport from "../services/Passport/passport";

const authController = AuthController();
const router = Router();

router.get("/confirm/:confirmId", authController.registerUser);
router.post(
  "/register",
  validateDTO(RegisterUserDTO),
  authController.registerTempUser
);
router.post("/login", validateDTO(LoginUserDTO), authController.loginUser);
// Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/google-profile");
  }
);
// Github Auth
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/github-profile");
  }
);
export default router;
