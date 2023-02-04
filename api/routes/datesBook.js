import express from "express";
import { getDates} from "../controllers/datesBook.js";
// import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/:id", getDate);
router.get("/:id", getDates);


export default router
