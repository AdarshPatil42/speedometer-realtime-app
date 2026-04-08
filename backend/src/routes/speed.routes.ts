import { Router } from "express";
import { getLatestSpeed } from "../controllers/speed.controller";

const router = Router();

router.get("/latest", getLatestSpeed);

export default router;