import mongoose from "mongoose";

const BookingDateSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const BookingSchema = new mongoose.Schema({
  bookingTotalPrice: {
    type: Number,
    required: true,
  },
  poolvillaName: {
    type: String,
    required: true,
  },
  statusBooking: {
    type: String,
    required: true,
  },
  bookingDates: [BookingDateSchema],
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
 
  phone: {
    type: String,
    required: true,
    unique: false,
  },
  lineId: {
    type: String,
  },
  slip: [{ type: String }],
  poolvillaId: {
    type: String,
    required: true,
    unique: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Booking", BookingSchema);
