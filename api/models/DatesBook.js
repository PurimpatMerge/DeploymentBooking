import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const calendarSchema = new mongoose.Schema({
  pvid: {
    type: String,
    required: true,
  },
  events: [EventSchema],
});

export default mongoose.model("DatesBook", calendarSchema);
