import { Router } from "express";

const router = Router();

router.get("/google-profile", (req, res) => {
  res.send(`Logado via Google`);
});

export default router;
