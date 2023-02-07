import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  date: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  friPrice: {
    type: Number,
    required: true,
  },
  satPrice: {
    type: Number,
    required: true,
  },
  sunPrice: {
    type: Number,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
  maxpersons: {
    type: Number,
    required: true,
  },
  addonBed: {
    type: Number,
    required: true,
  },
  bed: {
    type: String,
    required: true,
  },
  insurance: {
    type: Number,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  distanceSea: {
    type: Number,
  },
  parkinglot: {
    type: String,
    required: true,
  },
  animal: {
    type: Boolean,
  },
  animalDes: {
    type: String,
  },
  swimmingPool: {
    type: Boolean,
  },
  swimmingPoolDes: {
    type: String,
  },
  slider: {
    type: Boolean,
  },
  karaoke: {
    type: Boolean,
  },
  rubberRing: {
    type: Boolean,
  },
  snooker : {
    type: Boolean,
  },
  discoLight: {
    type: Boolean,
  },
  kitchenEquipment: {
    type: Boolean,
  },
  wifi: {
    type: Boolean,
  },
  elseDes: {
    type: String,
  },
});

export default mongoose.model("Hotel", HotelSchema);
