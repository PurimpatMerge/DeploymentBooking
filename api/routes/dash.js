import express from "express";
import { dashCounter,dashChart,mostBook } from "../controllers/dash.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


router.get("/count",dashCounter);
router.get("/chart",dashChart);
router.get("/mostbook",mostBook);

export default router