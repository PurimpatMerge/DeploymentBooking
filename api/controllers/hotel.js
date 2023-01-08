import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  try {
    const min = req.query?.min || 1 ;
    const max = req.query?.max || 99999 ;
    const city = req.query?.city ||"a";
    const maxpersons = req.query?.maxpersons || 1;
    const toM = req.query?.sea / 0.0001 || 90;
    const hotels = await Hotel.find({
      $or: [
        { city: { $regex: `${city}`, $options: "i" || "a" } },
        { name: { $regex: `${city}`, $options: "i" } },
      ],
      cheapestPrice: { $gte: min || 1, $lte: max || 99999 },

      maxpersons: { $gte: maxpersons || 1 },
      distanceSea: { $lte: toM || 90 },
    }).limit(req.query.limit);
    console.log(min, max, city, maxpersons, toM);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

export const getAllHotel = async (req, res, next) => {
  const { min, max, ...other } = req.query;
  try {
    const getAllHotel = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min | 1, $lt: max || 99999 },
    }).limit(req.query.limit);
    res.status(200).json(getAllHotel);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
// export const countByType = async (req, res, next) => {
//   try {
//     const hotelCount = await Hotel.countDocuments({ type: "hotel" });
//     const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
//     const resortCount = await Hotel.countDocuments({ type: "resort" });
//     const villaCount = await Hotel.countDocuments({ type: "villa" });
//     const cabinCount = await Hotel.countDocuments({ type: "cabin" });

//     res.status(200).json([
//       { type: "hotel", count: hotelCount },
//       { type: "apartments", count: apartmentCount },
//       { type: "resorts", count: resortCount },
//       { type: "villas", count: villaCount },
//       { type: "cabins", count: cabinCount },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };

//count hotel that in the city
// export const countByType = async (req, res, next) => {
//   const typeCountPoolvilla = await Hotel.countDocuments({ type: "PoolVilla" });
//   const typeCountHotel = await Hotel.countDocuments({ type: "Hotel" });
//   try {
//     //find how many item in PoolVilla
//     res.status(200).json([
//       { type: "Poolvilla", count: typeCountPoolvilla },
//       { type: "Hotel", count: typeCountHotel },
//     ]);
//   } catch (err) {
//     next(err);
//   }
// };

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
