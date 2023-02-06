import express from "express";
import { getDates,updateDates,deleteDate} from "../controllers/datesBook.js";
// import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/:id", getDate);
router.get("/:id", getDates);
router.put("/update/:id", updateDates);
// router.post("/new/:id", addDate);
router.delete("/:id", deleteDate);


export default router
