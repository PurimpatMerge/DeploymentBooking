import express from "express";
import {bookingUser,GetbookingUser } from "../controllers/booking.js";
// import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//Booking
router.post("/confirm", bookingUser);
//UPDATE
// router.put("/:id", updateUser);
router.get("/admin", GetbookingUser);

// //DELETE
// router.delete("/:id",  deleteUser);

// //GET
// router.get("/:id", getUser);

// //GET ALL
// router.get("/", getUsers);

export default router
