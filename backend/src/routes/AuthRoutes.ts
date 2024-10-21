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
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, data, info) => {
    if (err) {
      res.status(500).json({ message: `Erro interno de autenticação: ${err}` });
      return;
    }

    if (!data) {
      res.status(400).json({ message: `Erro ao autenticar: ${info}` });
      return;
    }

    res.redirect(
      `http://localhost:5173/auth/google/callback?token=${data.token}`
    );
  })(req, res, next);
});
// Github Auth
router.get("/github", passport.authenticate("github"));

router.get("/github/callback", (req, res, next) => {
  passport.authenticate(
    "github",
    { session: false },
    (err: any, data: { user: any; token: any }, info: any) => {
      if (err) {
        res
          .status(500)
          .json({ message: `Erro interno de autenticação: ${err}` });
        return;
      }

      if (!data) {
        res.status(400).json({ message: `Erro ao autenticar: ${info}` });
        return;
      }

      const user = encodeURIComponent(JSON.stringify(data.user));
      console.log("USER", user);
      res.redirect(
        `http://localhost:5173/auth/google/callback?token=${data.token}&user=${user}`
      );
    }
  )(req, res, next);
});
export default router;
