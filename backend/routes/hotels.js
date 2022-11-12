import express from "express";
import Hotel from "../schema/Hotels.js";

const router = express.Router();

//Create
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Update
router.put("/:id", async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully.");
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get
router.get("/:id", async (req, res) => {
  try {
    const getHotel = await Hotel.findById(
      req.params.id,
    );
    res.status(200).json(getHotel);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Get All
router.get("/", async (req, res) => {
  try {
    const getAllHotel = await Hotel.find();
    res.status(200).json(getAllHotel);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
