import Booking from "../models/Booking.js";

export const bookingUser = async (req, res) => {
  try {

    const bookingData = new Booking(
     req.body
    );

const savedBookingData = await bookingData.save();
    res.status(200).json({
      success: true,
      data: savedBookingData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


export const GetbookingUser = async (req, res, next) => {
  try {
    console.log(1);
    const bookingData = await Booking.find();
    if (!bookingData) {
      return res.status(404).json({
        success: false,
        error: "No booking data found"
      });
    }
    res.status(200).json({
      success: true,
      data: bookingData
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
