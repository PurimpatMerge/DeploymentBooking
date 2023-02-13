import express from "express";
import {
  countByCity,
  createHotel,
  deleteHotel,
  deleteHotelphoto,
  getHotel,
  getHotels,
  getAllHotel,
  updateHotel,
  counterView
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/view/:id", counterView);
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
router.delete("/photos/:id", verifyAdmin, deleteHotelphoto);
//GET

//GET ALL
router.get("/find/:id", getHotel);
router.get("/", getHotels);
router.get("/admin/", getAllHotel);
router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);

export default router;
