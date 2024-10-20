import { Router } from "express";

const router = Router();

router.get("/google-profile", (req, res) => {
  res.send(`Logado via Google`);
});
router.get("/github-profile", (req, res) => {
  res.send(`Logado via Github`);
});
export default router;
