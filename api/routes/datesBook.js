import express from "express";
import {
  getDates,
  updateDates,
  deleteDate,
  findPrice,
  findPriceNormal,
} from "../controllers/datesBook.js";
// import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/:id", getDate);
router.get("/:id", getDates);
router.put("/update/:id", updateDates);
// router.post("/new/:id", addDate);
router.delete("/:id", deleteDate);
router.get(
  "/bookingPoolvillaDate/:id/:userStartDate/:userEndDate/:startPrice/:friPrice/:satPrice/:sunPrice",
  findPrice
);
router.get(
  "/bookingPoolvillaDate/:id/:userStartDate/:userEndDate/:startPrice",
  findPriceNormal
);

export default router;
