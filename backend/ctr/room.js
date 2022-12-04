import Room from "../schema/Rooms.js";
import Hotel from "../schema/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
      const savedRoom = await newRoom.save();
      try {
          await Hotel.findByIdAndUpdate(hotelId, {
              $push: { rooms: savedRoom._id },
            });
            console.log(savedRoom._id);
    } catch (err) {
      next(err);
    }

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res ,next) => {
    try {
        const thisupdateRoom = await Room.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(thisupdateRoom);
      } catch (err) {
        next(err);
      }
};
//Delete
export const deleteRoom = async (req, res ,next) => {
    const hotelId= req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull : {rooms : req.params.id}
            });
        }catch(err){
            next(err);
        }
        res.status(200).json("Deleted successfully.");
      } catch (err) {
        next(err);
      }
};
//Get by Id
export const getRoom = async (req, res ,next) => {
    try {
        const getRoom = await Room.findById(
          req.params.id,
        );
        res.status(200).json(getRoom);
      } catch (err) {
        next(err);
      }
};
//Get All
export const getAllRoom = async (req, res ,next) => {
    try {
      const getAllRoom = await Room.find();
      res.status(200).json(getAllRoom);
    } catch (err) {
        next(err);
    }
  };