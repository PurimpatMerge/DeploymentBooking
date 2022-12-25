import Hotel from "../schema/Hotels.js";
//Create
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
//Update
export const updateHotel = async (req, res, next) => {
  try {
    const thisupdateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(300).json(thisupdateHotel);
  } catch (err) {
    next(err);

  }
};
//Delete
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted successfully.");
  } catch (err) {
    next(err);
  }
};
//Get by Id
export const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};
//Get All
export const getAllHotel = async (req, res, next) => {
  const { min, max, ...other } = req.query;
  try {
    const getAllHotel = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min | 1, $lt: max || 99999},
    }).limit(req.query.limit);
    res.status(200).json(getAllHotel);
  } catch (err) {
    next(err);
  }
};

//count hotel that in the city
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    //find all the same require city
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

//count hotel that in the city
export const countByType = async (req, res, next) => {
  const typeCountPoolvilla = await Hotel.countDocuments({ type: "PoolVilla" });
  const typeCountHotel = await Hotel.countDocuments({ type: "Hotel" });
  try {
    //find how many item in PoolVilla
    res.status(200).json([
      { type: "Poolvilla", count: typeCountPoolvilla },
      { type: "Hotel", count: typeCountHotel },
    ]);
  } catch (err) {
    next(err);
  }
};
