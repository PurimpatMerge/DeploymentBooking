import express from "express";
import {bookingUser,GetbookingUser,Reject,Approve,MyBooking } from "../controllers/booking.js";

import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//Booking
router.post("/confirm", bookingUser);
router.get("/tracking/:username/:email", MyBooking);
//UPDATE
// router.put("/:id", updateUser);
router.get("/admin", verifyAdmin,GetbookingUser);

// //DELETE
router.put("/reject/:id",verifyAdmin, Reject);
// router.delete("/:id",  deleteUser);
router.put("/approve/:id",verifyAdmin, Approve);

// //GET
// router.get("/:id", getUser);

// //GET ALL
// router.get("/", getUsers);

export default router
