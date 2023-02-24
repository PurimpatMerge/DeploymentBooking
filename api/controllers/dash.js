import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";


export const mostBook = async (req, res, next) => {
 
  try {
    const bookingData = await Booking.aggregate([
      {
        $group: {
          _id: "$poolvillaId",
          poolvillaName: { $first: "$poolvillaName" },
          count: { $sum: 1 },
        },
      },
    ]);
    const poolvillaIds = bookingData.map((data) => data._id);
    const poolvillas = await Hotel.find({ _id: { $in: poolvillaIds } }, "views photos");
    const poolvillasMap = {};
    const poolvillasPhotos = {};
    
    poolvillas.forEach((poolvilla) => {
      poolvillasMap[poolvilla._id] = poolvilla.views;
      poolvillasPhotos[poolvilla._id] = poolvilla.photos;
    });

    const bookingDataWithViews = bookingData.map((data) => ({
      ...data,
      views: poolvillasMap[data._id] || 0,
      photo:poolvillasPhotos[data._id][0]
    }));

    res.status(200).json(
 bookingDataWithViews
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const dashChart = async (req, res, next) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  try {
    const allBooking = await Booking.find();
    let bookingCounts = Array(12).fill(0);

    allBooking.forEach((booking) => {
      booking.bookingDates.forEach((bookingDate) => {
        const bookingMonth = new Date(bookingDate.day).getMonth();
        bookingCounts[bookingMonth]++;
      });
    });

    const data = months.map((month, index) => {
      return { name: month, Total: bookingCounts[index] };
    });

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


export const dashCounter = async (req, res, next) => {
  try {
    const poolVilla = await Hotel.countDocuments();
    const pendingBookings = await Booking.countDocuments({ statusBooking: "Pending" });
    const approveBookings = await Booking.countDocuments({ statusBooking: "Approved" });
    const totalBookingPrice = await Booking.aggregate([
        {
          $match: { statusBooking: "Approved" }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$bookingTotalPrice" }
          }
        }
      ]);

    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({
        success: false,
        error: "No user data found",
      });
    }

    let countNonAdmin = 0;
    for (const user of userData) {
      if (!user.isAdmin) {
        countNonAdmin++;
      }
    }

    res.status(200).json({
      success: true,
      poolVilla:poolVilla,
        pending: pendingBookings,
        approve: approveBookings,
    
      totalBookingPrice: totalBookingPrice[0].total,
      countNonAdmin: countNonAdmin
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
